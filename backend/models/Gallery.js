const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['residential', 'commercial', 'renovation'],
    default: 'residential'
  },
  type: {
    type: String,
    required: true,
    enum: ['image', 'video'],
    default: 'image'
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
gallerySchema.index({ category: 1, type: 1, isActive: 1, order: 1 });

module.exports = mongoose.model('Gallery', gallerySchema);
