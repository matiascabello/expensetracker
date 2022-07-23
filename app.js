const express = require('express');
const helmet = require('helmet'); // Install

const expensesRoutes = require('./routes/expenses.routes');
const categoriesRoutes = require('./routes/categories.routes');

const app = express();

const { sequelize } = require('./models');

// Middlewares
app.use(express.json());
app.use(helmet());

// Headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

// Routes
app.use('/', expensesRoutes);
app.use('/', categoriesRoutes);


//Start server
app.listen(process.env.PORT || 5000, async ()=> {
    console.log('Server running');
    await sequelize.authenticate();
    console.log('DB connected.')
})