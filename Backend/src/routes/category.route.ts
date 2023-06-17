import { Router } from 'express';
const router = Router();

// Utils
import { Roles } from '../utils/constants.util';

// Middlewares
import checkRole from '../middleware/check-role.middleware';

// Controllers
import categoryController from '../controllers/category.controller';

// Routes
router.get('/', checkRole([Roles.ALLOW_CATEGORIES_VIEW]), categoryController.getAll);
router.get('/:id', checkRole([Roles.ALLOW_CATEGORIES_OPERATION]), categoryController.getOne);
router.post('/', checkRole([Roles.ALLOW_CATEGORIES_OPERATION]), categoryController.createOne);
router.put('/:id', checkRole([Roles.ALLOW_CATEGORIES_OPERATION]), categoryController.updateOne);
router.delete('/:id', checkRole([Roles.ALLOW_CATEGORIES_OPERATION]), categoryController.deleteOne);
router.get('/data/export', checkRole([Roles.ALLOW_CATEGORIES_OPERATION]), categoryController.export);

export default router;
