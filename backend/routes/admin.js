const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const Admin = require('../models/Admin');
const Project = require('../models/Project');
const Gallery = require('../models/Gallery');
const Service = require('../models/Service');
const TeamMember = require('../models/TeamMember');
const auth = require('../middleware/auth');
const router = express.Router();

// Rate limiting for admin login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    message: 'Too many login attempts, please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting for password change
const passwordChangeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 password change attempts per hour
  message: {
    message: 'Too many password change attempts, please try again after 1 hour.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Admin Login
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const admin = await Admin.findOne({ username, isActive: true });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      admin: admin.toPublicJSON()
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get admin profile
router.get('/profile', auth, async (req, res) => {
  try {
    res.json({ admin: req.admin });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get dashboard stats
router.get('/dashboard', auth, async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const ongoingProjects = await Project.countDocuments({ status: 'ongoing' });
    const completedProjects = await Project.countDocuments({ status: 'completed' });
    const residentialProjects = await Project.countDocuments({ typeOfProject: 'residential' });
    const commercialProjects = await Project.countDocuments({ typeOfProject: 'commercial' });

    res.json({
      stats: {
        totalProjects,
        ongoingProjects,
        completedProjects,
        residentialProjects,
        commercialProjects
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new admin (super admin only)
router.post('/create', auth, async (req, res) => {
  try {
    if (req.admin.role !== 'super-admin') {
      return res.status(403).json({ message: 'Access denied. Super admin required.' });
    }

    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const newAdmin = new Admin({
      username,
      email,
      password,
      role: role || 'admin'
    });

    await newAdmin.save();

    res.status(201).json({
      message: 'Admin created successfully',
      admin: newAdmin.toPublicJSON()
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Password strength validation
const validatePasswordStrength = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return { isValid: false, message: `Password must be at least ${minLength} characters long` };
  }
  if (!hasUpperCase) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!hasLowerCase) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!hasNumbers) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  if (!hasSpecialChar) {
    return { isValid: false, message: 'Password must contain at least one special character' };
  }

  return { isValid: true };
};

// Change password
router.put('/change-password', auth, passwordChangeLimiter, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new password are required' });
    }

    // Validate new password strength
    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      return res.status(400).json({ message: passwordValidation.message });
    }

    const admin = await Admin.findById(req.admin._id);
    const isCurrentPasswordValid = await admin.comparePassword(currentPassword);
    
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Check if new password is different from current password
    const isSamePassword = await admin.comparePassword(newPassword);
    if (isSamePassword) {
      return res.status(400).json({ message: 'New password must be different from current password' });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout (client-side token removal)
router.post('/logout', auth, async (req, res) => {
  try {
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Gallery Management Routes
router.get('/gallery', auth, async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 });
    res.json({ gallery });
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/gallery', auth, async (req, res) => {
  try {
    const galleryItem = new Gallery(req.body);
    await galleryItem.save();
    res.status(201).json({ message: 'Gallery item created successfully', galleryItem });
  } catch (error) {
    console.error('Create gallery error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/gallery/:id', auth, async (req, res) => {
  try {
    const galleryItem = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json({ message: 'Gallery item updated successfully', galleryItem });
  } catch (error) {
    console.error('Update gallery error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/gallery/:id', auth, async (req, res) => {
  try {
    const galleryItem = await Gallery.findByIdAndDelete(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Delete gallery error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Services Management Routes
router.get('/services', auth, async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json({ services });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/services', auth, async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json({ message: 'Service created successfully', service });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/services/:id', auth, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service updated successfully', service });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/services/:id', auth, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Team Management Routes
router.get('/team', auth, async (req, res) => {
  try {
    const team = await TeamMember.find().sort({ createdAt: -1 });
    res.json({ team });
  } catch (error) {
    console.error('Get team error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/team', auth, async (req, res) => {
  try {
    const teamMember = new TeamMember(req.body);
    await teamMember.save();
    res.status(201).json({ message: 'Team member added successfully', teamMember });
  } catch (error) {
    console.error('Create team member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/team/:id', auth, async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json({ message: 'Team member updated successfully', teamMember });
  } catch (error) {
    console.error('Update team member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/team/:id', auth, async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Delete team member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
