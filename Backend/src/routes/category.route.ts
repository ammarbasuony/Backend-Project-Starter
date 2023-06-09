import { Router } from 'express';
const router = Router();

// Controllers
import categoryController from '../controllers/category.controller';

// Routes
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getOne);
router.post('/', categoryController.createOne);
router.put('/:id', categoryController.updateOne);
router.delete('/:id', categoryController.deleteOne);

export default router;
