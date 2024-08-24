import productService from '../services/productService.js';

const findAll = async (req, res) => {
    const offset = req.offset;
    const limit = req.limit;
    const products = await productService.findAll(offset, limit);
    const count = await productService.getProductCount();
    if (!products) {
        return res.status(404).json({ message: 'Products not found' });
    }
    const next = getNextLink(req, offset, limit, count);
    const previous = getPreviousLink(req, offset, limit);
    res.status(200).json({
        count,
        products,
        next,
        previous,
    });
};

const getNextLink = (req, offset, limit, count) => {
    if (offset + limit >= count)
        return null;

    const extraPath = req.path !== '/' ? req.path : '';
    return `${req.protocol}://${req.get('host')}${req.baseUrl}${extraPath}?offset=${offset + limit}&limit=${limit}`;
};

const getPreviousLink = (req, offset, limit) => {
    if (offset === 0)
        return null;

    const extraPath = req.path !== '/' ? req.path : '';
    return `${req.protocol}://${req.get('host')}${req.baseUrl}${extraPath}?offset=${Math.max(0, offset - limit)}&limit=${limit}`;
};


const paginationMiddleware = (req, _, next) => {
    const { offset, limit } = req.query;
    req.offset = +offset || 0;
    req.limit = +limit || 10;
    next();
};

const findById = async (req, res) => {
    const { id } = req.params;
    const product = await productService.findById(id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
};

const findByCategoryId = async (req, res) => {
    const { categoryId } = req.params;
    const offset = req.offset;
    const limit = req.limit;

    const products = await productService.findByCategoryId(+categoryId, offset, limit);
    const count = await productService.getProductCountByCategoryId(+categoryId);

    if (!products) {
        return res.status(404).json({ message: 'Something wrong' });
    }

    const next = getNextLink(req, offset, limit, count);
    const previous = getPreviousLink(req, offset, limit, count);

    res.status(200).json({
        count,
        products,
        next,
        previous,
    });
};

const persist = async (req, res) => {
    const product = req.body;
    const savedProduct = await productService.persist(product);
    if (!savedProduct) {
        return res.status(400).json({ message: 'Product not saved' });
    }
    res.status(201).json(savedProduct);
};

const checkBodyMiddleware = (req, res, next) => {
    if (!Object.keys(req.body).length) {
        return res.status(400).json({ message: 'Product body is required' });
    }
    next();
};

const update = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    const updatedProduct = await productService.update(+id, product);
    if (!updatedProduct) {
        return res.status(400).json({ message: 'Product not updated' });
    }
    res.status(200).json(updatedProduct);
};

const remove = async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await productService.remove(+id);
    if (!deletedProduct) {
        return res.status(400).json({ message: 'Product not deleted' });
    }
    res.status(200).json(deletedProduct);
};

export default {
    findAll,
    findById,
    findByCategoryId,
    persist,
    checkBodyMiddleware,
    paginationMiddleware,
    update,
    remove
};