const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const router = express.Router();

// Configure Cloudinary with better timeout settings
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 60000, // 60 seconds timeout
  secure: true
});

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Configure multer for project images (mainImage + images)
const uploadProjectImages = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
}).fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]);

// Get all projects with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const status = req.query.status;
    const type = req.query.type;
    const search = req.query.search;

    const skip = (page - 1) * limit;
    
    // Build filter
    const filter = { isActive: true };
    if (status) filter.status = status;
    if (type) filter.typeOfProject = type;
    if (search) {
      filter.$or = [
        { projectName: { $regex: search, $options: 'i' } },
        { projectDescription: { $regex: search, $options: 'i' } },
        { client: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const projects = await Project.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Project.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
      projects,
      pagination: {
        currentPage: page,
        totalPages,
        totalProjects: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project || !project.isActive) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ project });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new project (admin only)
router.post('/', auth, uploadProjectImages, async (req, res) => {
  try {
    // Debug: Log received data
    console.log('Received project data:', req.body);
    
    const {
      projectName,
      projectDescription,
      typeOfProject,
      client,
      area,
      status,
      location,
      mapLink,
      imageCaptions
    } = req.body;

    if (!projectName || !projectDescription || !typeOfProject || !client || !area || !status || !location) {
      console.log('Missing fields:', { projectName, projectDescription, typeOfProject, client, area, status, location });
      return res.status(400).json({ message: 'All fields are required' });
    }

    const images = [];
    const captions = imageCaptions ? JSON.parse(imageCaptions) : [];

    // Handle main image upload
    if (req.files && req.files.mainImage && req.files.mainImage.length > 0) {
      try {
        const file = req.files.mainImage[0];
        
        // Check file size before upload
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          return res.status(400).json({ message: 'Main image is too large. Maximum size is 5MB.' });
        }

        // Convert buffer to base64 for Cloudinary
        const buffer = file.buffer;
        const base64String = buffer.toString('base64');
        const dataURI = `data:${file.mimetype};base64,${base64String}`;

        // Upload with retry logic
        let result;
        let retryCount = 0;
        const maxRetries = 3;

        while (retryCount < maxRetries) {
          try {
            result = await cloudinary.uploader.upload(dataURI, {
              folder: 'jay-ambe-construction/projects',
              transformation: [
                { width: 800, height: 600, crop: 'fill' },
                { quality: 'auto' }
              ],
              timeout: 30000, // 30 seconds per image
              resource_type: 'image'
            });
            break; // Success, exit retry loop
          } catch (uploadError) {
            retryCount++;
            console.error(`Cloudinary upload attempt ${retryCount} failed for main image:`, uploadError);
            
            if (retryCount >= maxRetries) {
              throw uploadError; // Final failure
            }
            
            // Wait before retry (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          }
        }

        images.push({
          url: result.secure_url,
          cloudinaryId: result.public_id,
          caption: '',
          isMain: true
        });

        console.log(`Successfully uploaded main image: ${result.public_id}`);
      } catch (uploadError) {
        console.error('Main image upload error:', uploadError);
        return res.status(500).json({ 
          message: 'Main image upload failed after multiple attempts. Please try again with a smaller image or check your internet connection.' 
        });
      }
    }

    // Upload additional images to Cloudinary if provided
    if (req.files && req.files.images && req.files.images.length > 0) {
      for (let i = 0; i < req.files.images.length; i++) {
        try {
          const file = req.files.images[i];
          
          // Check file size before upload
          if (file.size > 5 * 1024 * 1024) { // 5MB limit
            return res.status(400).json({ message: `Image ${i + 1} is too large. Maximum size is 5MB.` });
          }

          // Convert buffer to base64 for Cloudinary
          const buffer = file.buffer;
          const base64String = buffer.toString('base64');
          const dataURI = `data:${file.mimetype};base64,${base64String}`;

          // Upload with retry logic
          let result;
          let retryCount = 0;
          const maxRetries = 3;

          while (retryCount < maxRetries) {
            try {
              result = await cloudinary.uploader.upload(dataURI, {
                folder: 'jay-ambe-construction/projects',
                transformation: [
                  { width: 800, height: 600, crop: 'fill' },
                  { quality: 'auto' }
                ],
                timeout: 30000, // 30 seconds per image
                resource_type: 'image'
              });
              break; // Success, exit retry loop
            } catch (uploadError) {
              retryCount++;
              console.error(`Cloudinary upload attempt ${retryCount} failed for image ${i + 1}:`, uploadError);
              
              if (retryCount >= maxRetries) {
                throw uploadError; // Final failure
              }
              
              // Wait before retry (exponential backoff)
              await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
            }
          }

          images.push({
            url: result.secure_url,
            cloudinaryId: result.public_id,
            caption: captions[i] || ''
          });

          console.log(`Successfully uploaded image ${i + 1}: ${result.public_id}`);
        } catch (uploadError) {
          console.error(`Cloudinary upload error for image ${i + 1}:`, uploadError);
          
          // Clean up any previously uploaded images
          for (const uploadedImage of images) {
            try {
              await cloudinary.uploader.destroy(uploadedImage.cloudinaryId);
            } catch (cleanupError) {
              console.error('Error cleaning up image:', cleanupError);
            }
          }
          
          return res.status(500).json({ 
            message: `Image ${i + 1} upload failed after multiple attempts. Please try again with a smaller image or check your internet connection.` 
          });
        }
      }
    }

    // Create project
    const project = new Project({
      projectName,
      projectDescription,
      typeOfProject,
      client,
      area,
      status,
      location,
      mapLink,
      images
    });

    await project.save();
    res.status(201).json({ message: 'Project created successfully', project });

  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update project (admin only)
router.put('/:id', auth, uploadProjectImages, async (req, res) => {
  try {
    // Debug: Log received data
    console.log('Received update data:', req.body);
    
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const {
      projectName,
      projectDescription,
      typeOfProject,
      client,
      area,
      status,
      location,
      mapLink,
      imageCaptions,
      existingImages,
      imagesToDelete
    } = req.body;

    // Update fields
    if (projectName) project.projectName = projectName;
    if (projectDescription) project.projectDescription = projectDescription;
    if (typeOfProject) project.typeOfProject = typeOfProject;
    if (client) project.client = client;
    if (area) project.area = area;
    if (status) project.status = status;
    if (location) project.location = location;
    if (mapLink !== undefined) project.mapLink = mapLink;

    // Handle existing images update
    if (existingImages) {
      const parsedExistingImages = JSON.parse(existingImages);
      project.images = project.images.map(img => {
        const existing = parsedExistingImages.find(e => e.cloudinaryId === img.cloudinaryId);
        if (existing) {
          img.caption = existing.caption || '';
        }
        return img;
      });
    }

    // Handle image deletion
    if (imagesToDelete) {
      const imagesToDeleteArray = JSON.parse(imagesToDelete);
      for (const imageId of imagesToDeleteArray) {
        try {
          await cloudinary.uploader.destroy(imageId);
        } catch (error) {
          console.error('Error deleting image from Cloudinary:', error);
        }
      }
      project.images = project.images.filter(img => !imagesToDeleteArray.includes(img.cloudinaryId));
    }

    // Handle main image upload
    if (req.files && req.files.mainImage && req.files.mainImage.length > 0) {
      try {
        const file = req.files.mainImage[0];
        
        // Check file size before upload
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          return res.status(400).json({ message: 'Main image is too large. Maximum size is 5MB.' });
        }

        // Convert buffer to base64 for Cloudinary
        const buffer = file.buffer;
        const base64String = buffer.toString('base64');
        const dataURI = `data:${file.mimetype};base64,${base64String}`;

        // Upload with retry logic
        let result;
        let retryCount = 0;
        const maxRetries = 3;

        while (retryCount < maxRetries) {
          try {
            result = await cloudinary.uploader.upload(dataURI, {
              folder: 'jay-ambe-construction/projects',
              transformation: [
                { width: 800, height: 600, crop: 'fill' },
                { quality: 'auto' }
              ],
              timeout: 30000, // 30 seconds per image
              resource_type: 'image'
            });
            break; // Success, exit retry loop
          } catch (uploadError) {
            retryCount++;
            console.error(`Cloudinary upload attempt ${retryCount} failed for main image:`, uploadError);
            
            if (retryCount >= maxRetries) {
              throw uploadError; // Final failure
            }
            
            // Wait before retry (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          }
        }

        project.images.push({
          url: result.secure_url,
          cloudinaryId: result.public_id,
          caption: '',
          isMain: true
        });

        console.log(`Successfully uploaded main image: ${result.public_id}`);
      } catch (uploadError) {
        console.error('Main image upload error:', uploadError);
        return res.status(500).json({ 
          message: 'Main image upload failed after multiple attempts. Please try again with a smaller image or check your internet connection.' 
        });
      }
    }

    // Handle additional image uploads
    if (req.files && req.files.images && req.files.images.length > 0) {
      const captions = imageCaptions ? JSON.parse(imageCaptions) : [];
      
      for (let i = 0; i < req.files.images.length; i++) {
        try {
          const file = req.files.images[i];
          
          // Check file size before upload
          if (file.size > 5 * 1024 * 1024) { // 5MB limit
            return res.status(400).json({ message: `Image ${i + 1} is too large. Maximum size is 5MB.` });
          }

          // Convert buffer to base64 for Cloudinary
          const buffer = file.buffer;
          const base64String = buffer.toString('base64');
          const dataURI = `data:${file.mimetype};base64,${base64String}`;

          // Upload with retry logic
          let result;
          let retryCount = 0;
          const maxRetries = 3;

          while (retryCount < maxRetries) {
            try {
              result = await cloudinary.uploader.upload(dataURI, {
                folder: 'jay-ambe-construction/projects',
                transformation: [
                  { width: 800, height: 600, crop: 'fill' },
                  { quality: 'auto' }
                ],
                timeout: 30000, // 30 seconds per image
                resource_type: 'image'
              });
              break; // Success, exit retry loop
            } catch (uploadError) {
              retryCount++;
              console.error(`Cloudinary upload attempt ${retryCount} failed for image ${i + 1}:`, uploadError);
              
              if (retryCount >= maxRetries) {
                throw uploadError; // Final failure
              }
              
              // Wait before retry (exponential backoff)
              await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
            }
          }

          project.images.push({
            url: result.secure_url,
            cloudinaryId: result.public_id,
            caption: captions[i] || ''
          });

          console.log(`Successfully uploaded image ${i + 1}: ${result.public_id}`);
        } catch (uploadError) {
          console.error(`Cloudinary upload error for image ${i + 1}:`, uploadError);
          return res.status(500).json({ 
            message: `Image ${i + 1} upload failed after multiple attempts. Please try again with a smaller image or check your internet connection.` 
          });
        }
      }
    }

    await project.save();
    res.json({ message: 'Project updated successfully', project });

  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete project (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete all images from Cloudinary
    if (project.images && project.images.length > 0) {
      for (const image of project.images) {
        try {
          await cloudinary.uploader.destroy(image.cloudinaryId);
        } catch (error) {
          console.error('Error deleting image from Cloudinary:', error);
        }
      }
    }

    // Soft delete
    project.isActive = false;
    await project.save();

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get project statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments({ isActive: true });
    const ongoingProjects = await Project.countDocuments({ status: 'ongoing', isActive: true });
    const completedProjects = await Project.countDocuments({ status: 'completed', isActive: true });
    const residentialProjects = await Project.countDocuments({ typeOfProject: 'residential', isActive: true });
    const commercialProjects = await Project.countDocuments({ typeOfProject: 'commercial', isActive: true });

    res.json({
      totalProjects,
      ongoingProjects,
      completedProjects,
      residentialProjects,
      commercialProjects
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Export projects to CSV (admin only)
router.get('/export/csv', auth, async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true }).sort({ createdAt: -1 });
    
         // Create CSV content
           const csvHeaders = [
        'Project Name',
        'Project Description',
        'Type of Project', 
        'Client',
        'Area',
        'Status',
        'Location',
        'Map Link',
        'Number of Images',
        'Created Date'
      ];
      
      const csvRows = projects.map(project => [
        project.projectName,
        project.projectDescription,
        project.typeOfProject,
        project.client,
        project.area,
        project.status,
        project.location,
        project.mapLink || '',
        project.images ? project.images.length : 0,
        new Date(project.createdAt).toLocaleDateString()
      ]);
    
    const csvContent = [csvHeaders, ...csvRows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    // Set headers for CSV download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="projects-${new Date().toISOString().split('T')[0]}.csv"`);
    
    res.send(csvContent);
  } catch (error) {
    console.error('CSV export error:', error);
    res.status(500).json({ message: 'Failed to export projects' });
  }
});

module.exports = router;
