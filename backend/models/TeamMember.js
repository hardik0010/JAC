const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  social: {
    linkedin: String,
    x: String,
    facebook: String,
    instagram: String
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
teamMemberSchema.index({ isActive: 1, order: 1 });

module.exports = mongoose.model('TeamMember', teamMemberSchema);
