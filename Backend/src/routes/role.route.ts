import { Router } from 'express';
const router = Router();

// Utils
import { Roles } from '../utils/constants.util';

// Middlewares
import checkRole from '../middleware/check-role.middleware';

// Controller
import roleController from '../controllers/role.controller';

// Routes
router.get('/', checkRole([Roles.ALLOW_ROLES_VIEW]), roleController.getAll);
router.get('/:id', checkRole([Roles.ALLOW_ROLES_OPERATION]), roleController.getOne);
router.post('/', checkRole([Roles.ALLOW_ROLES_OPERATION]), roleController.createOne);
router.put('/:id', checkRole([Roles.ALLOW_ROLES_OPERATION]), roleController.updateOne);
router.delete('/:id', checkRole([Roles.ALLOW_ROLES_OPERATION]), roleController.deleteOne);

export default router;
