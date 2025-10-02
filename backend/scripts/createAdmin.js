const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Admin Schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  role: {
    type: String,
    enum: ['admin', 'super-admin'],
    default: 'admin'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Admin = mongoose.model('Admin', adminSchema);

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Username: admin');
      console.log('Email:', existingAdmin.email);
      console.log('Role:', existingAdmin.role);
      process.exit(0);
    }

    // Create new admin
    const admin = new Admin({
      username: 'admin',
      email: 'admin@jayambeconstruction.com',
      password: process.env.ADMIN_PASSWORD || 'ChangeMe123!@#',
      role: 'super-admin'
    });

    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: [CHANGE_AFTER_FIRST_LOGIN]');
    console.log('Email: admin@jayambeconstruction.com');
    console.log('Role: super-admin');
    console.log('\n🔐 Please change the password after first login!');

  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin();