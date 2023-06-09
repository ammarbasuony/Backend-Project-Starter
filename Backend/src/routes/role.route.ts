import { Router } from 'express';
const router = Router();

// Controller
import roleController from '../controllers/role.controller';

// Routes
router.get('/', roleController.getAll);
router.get('/:id', roleController.getOne);
router.post('/', roleController.createOne);
router.put('/:id', roleController.updateOne);
router.delete('/:id', roleController.deleteOne);

export default router;
