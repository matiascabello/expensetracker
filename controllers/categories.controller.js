const models = require('../models');

exports.postCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const newCategory = await models.Category.create({
            name: name
        })
        res.status(201).json(newCategory)
    } catch (error) {
        return res.status(500).json({message: error.message})

    }
}

exports.getCategories = async (req, res) => {
    
    try {

        const categories = await models.Category.findAll();
        res.status(200).json(categories);
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}