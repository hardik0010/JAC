const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { body, validationResult } = require('express-validator');

// GET all services (public)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET single service (public)
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST create new service (admin only)
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('features').isArray().withMessage('Features must be an array'),
  body('image').notEmpty().withMessage('Image URL is required'),
  body('icon').notEmpty().withMessage('Icon is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT update service (admin only)
router.put('/:id', [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('features').isArray().withMessage('Features must be an array'),
  body('image').notEmpty().withMessage('Image URL is required'),
  body('icon').notEmpty().withMessage('Icon is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE service (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
