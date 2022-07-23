const Category  = require('../controllers/categories.controller');
const router = require('express').Router();

// Create new category
router.post('/categories', Category.postCategory);

// Get all categories
router.get('/categories', Category.getCategories);

module.exports = router;