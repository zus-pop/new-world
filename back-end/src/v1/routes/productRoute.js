import express from 'express';
import productController from '../../controllers/productController.js';

const router = express.Router();

// GET: /api/v1/products
router.get('/', productController.paginationMiddleware, productController.findAll);

// POST: /api/v1/products
router.post('/', productController.checkBodyMiddleware, productController.persist);

// GET: /api/v1/products/search?name=
router.get('/search', productController.paginationMiddleware, productController.findByName);

// GET: /api/v1/products/:id
router.get('/:id', productController.findById);

// PUT: /api/v1/products/:id
router.put('/:id', productController.checkBodyMiddleware, productController.update);

// DELETE: /api/v1/products/:id
router.delete('/:id', productController.remove);

// GET: /api/v1/products/category/:id
router.get('/category/:categoryId', productController.paginationMiddleware, productController.findByCategoryId);

export default router;