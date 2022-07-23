const expenses = require('../controllers/expenses.controller');
const router = require('express').Router();

// Create new expense
router.post('/expenses', expenses.postExpenses);

// Find one
router.get('/expenses/:id', expenses.getOneExpense);

// Find all expenses
router.get('/expenses', expenses.getAllExpenses);

// Delete one particular expense
router.delete('/expenses/:id', expenses.deleteExpenses);

// Update an expense
router.put('/expenses/:id', expenses.updateExpenses);

// Get updated balance
router.get('/balance', expenses.getBalance);

module.exports = router;