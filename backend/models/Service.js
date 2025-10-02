const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  features: [{
    type: String,
    trim: true
  }],
  image: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
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
serviceSchema.index({ isActive: 1, order: 1 });

module.exports = mongoose.model('Service', serviceSchema);
