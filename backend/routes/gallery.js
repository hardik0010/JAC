const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const { body, validationResult } = require('express-validator');

// GET all gallery items (public)
router.get('/', async (req, res) => {
  try {
    const { category, type } = req.query;
    let query = { isActive: true };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (type) {
      query.type = type;
    }

    const galleryItems = await Gallery.find(query).sort({ order: 1, createdAt: -1 });
    res.json(galleryItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET single gallery item (public)
router.get('/:id', async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json(galleryItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST create new gallery item (admin only)
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('category').isIn(['residential', 'commercial', 'renovation']).withMessage('Invalid category'),
  body('type').isIn(['image', 'video']).withMessage('Invalid type'),
  body('image').notEmpty().withMessage('Image URL is required'),
  body('description').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const galleryItem = new Gallery(req.body);
    await galleryItem.save();
    res.status(201).json(galleryItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT update gallery item (admin only)
router.put('/:id', [
  body('title').notEmpty().withMessage('Title is required'),
  body('category').isIn(['residential', 'commercial', 'renovation']).withMessage('Invalid category'),
  body('type').isIn(['image', 'video']).withMessage('Invalid type'),
  body('image').notEmpty().withMessage('Image URL is required'),
  body('description').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const galleryItem = await Gallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.json(galleryItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE gallery item (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const galleryItem = await Gallery.findByIdAndDelete(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
