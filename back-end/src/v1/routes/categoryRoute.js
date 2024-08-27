import express from 'express';
import categoryController from '../../controllers/categoryController.js';

const router = express.Router();

// GET: api/v1/categories
router.get('/', categoryController.findAll);

// GET: api/v1/categories/:id
router.get('/:id', categoryController.findById);

export default router;