import { Router } from 'express';
const router = Router();

// Controllers
import userController from '../controllers/user.controller';

// Routes
router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.post('/', userController.createOne);
router.put('/:id', userController.updateOne);
router.delete('/:id', userController.deleteOne);

export default router;
