const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');
const { body, validationResult } = require('express-validator');

// GET all team members (public)
router.get('/', async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET single team member (public)
router.get('/:id', async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json(teamMember);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST create new team member (admin only)
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('position').notEmpty().withMessage('Position is required'),
  body('image').notEmpty().withMessage('Image URL is required'),
  body('experience').notEmpty().withMessage('Experience is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('social').optional().isObject()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const teamMember = new TeamMember(req.body);
    await teamMember.save();
    res.status(201).json(teamMember);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT update team member (admin only)
router.put('/:id', [
  body('name').notEmpty().withMessage('Name is required'),
  body('position').notEmpty().withMessage('Position is required'),
  body('image').notEmpty().withMessage('Image URL is required'),
  body('experience').notEmpty().withMessage('Experience is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('social').optional().isObject()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.json(teamMember);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE team member (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
