const { sequelize } = require('../models');
const models = require('../models');

exports.postExpenses = async (req, res) => {

    const { description, type, amount, date, category_id } = req.body;

    try {
       
        const newExpense = await models.Expense.create({
            description: description,
            type: type,
            amount: amount,
            date: date,
            category_id: category_id
        })
    
        res.status(201).json(newExpense);

    } catch (error) {

        return res.status(500).json({message: error.message})
    }


}

exports.getAllExpenses = async (req, res) => {

    try {
        const expenses = await models.Expense.findAll({
            include: [{
                model: models.Category,
                attributes: ['name'],
                as: 'category',
            }],
                raw: true
/*             attributes: {
                include: [
                    [sequelize.fn('date_format', sequelize.col('date'), '%Y-%m-%d'), 'date'],
                ],
            }, */
        });
        res.status(200).json(expenses);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

exports.getOneExpense = async (req, res) => {

    try {
        const { id } = req.params;
        const expenses = await models.Expense.findByPk(id, {
            attributes: {
                include: [
                    [sequelize.fn('date_format', sequelize.col('date'), '%Y-%m-%d'), 'date'] 
                ]
            }
        });
        res.status(200).json(expenses);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    
}

exports.updateExpenses = async (req, res) => {

    try {

        const { id } = req.params;
        const { name, amount, date, category_id } = req.body;
    
        const expenses = await models.Expense.findByPk(id);
        expenses.name = name;
        expenses.amount = amount;
        expenses.date = date;
        expenses.category_id = category_id;
        await expenses.save();
    
        res.json(expenses)
        
    } catch (error) {

        return res.status(500).json({message: error.message});

    }

}

exports.deleteExpenses = async (req, res) => {

    try {

        const {id} = req.params;

        await models.Expense.destroy({
            where: {
                id,
            },
        });
    
        res.sendStatus(204);

    } catch (error) {
        return res.status(500).json({message: error.message});
    }

}

exports.getBalance = async (req, res) => {

    try {
        const income = await models.Expense.sum('amount', {where: {type: 'income'}});
        const expense = await models.Expense.sum('amount', {where: {type: 'expense'}});

        const balance = income - expense;
        res.status(200).json({
            income: income == null ? 0 : income,
            expense: expense == null ? 0 : expense,
            balance: balance
        })   
    } catch (error) {
        return res.status(500).json({message: error.message})        
    }

}