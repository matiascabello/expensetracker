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

exports.getCategory = async (req, res) => {

    try {
        const { id } = req.params;
        const category = await models.Category.findByPk(id);
        res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({message: error.message});  
    }

}