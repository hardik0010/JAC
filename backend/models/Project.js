const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  projectDescription: {
    type: String,
    required: true,
    trim: true
  },
  typeOfProject: {
    type: String,
    required: true,
    enum: ['residential', 'commercial', 'renovation'],
    default: 'residential'
  },
  client: {
    type: String,
    required: true,
    trim: true
  },
  area: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed'],
    default: 'ongoing'
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  mapLink: {
    type: String,
    trim: true
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    cloudinaryId: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ''
    },
    isMain: {
      type: Boolean,
      default: false
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
projectSchema.index({ typeOfProject: 1, status: 1, isActive: 1 });
projectSchema.index({ projectName: 'text', projectDescription: 'text', client: 'text', location: 'text' });

module.exports = mongoose.model('Project', projectSchema);
