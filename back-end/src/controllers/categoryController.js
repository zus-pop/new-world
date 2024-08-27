import categoryService from "../services/categoryService.js";

const findAll = async (_, res) => {
    const categories = await categoryService.findAll();
    if (!categories) {
        return res.status(404).json({ message: 'Categories not found' });
    }
    res.status(200).json(categories);
};

const findById = async (req, res) => {
    const { id } = req.params;
    const category = await categoryService.findById(id);
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }
    return res.status(200).json(category);
};

export default {
    findAll,
    findById
};