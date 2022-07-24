const Category  = require('../controllers/categories.controller');
const router = require('express').Router();

// Create new category
router.post('/categories', Category.postCategory);

// Get all categories
router.get('/categories', Category.getCategories);

// Get single category
router.get('/categories/:id', Category.getCategory);

module.exports = router;