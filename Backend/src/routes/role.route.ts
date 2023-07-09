import { Router } from 'express';
const router = Router();

// Utils
import { Roles } from '../utils/constants.util.js';

// Middlewares
import checkRole from '../middleware/check-role.middleware.js';

// Controller
import roleController from '../controllers/role.controller.js';

// Routes
router.get('/', checkRole([Roles.ALLOW_ROLES_VIEW]), roleController.getAll);
router.get('/:id', checkRole([Roles.ALLOW_ROLES_OPERATION]), roleController.getOne);
router.post('/', checkRole([Roles.ALLOW_ROLES_OPERATION]), roleController.createOne);
router.put('/:id', checkRole([Roles.ALLOW_ROLES_OPERATION]), roleController.updateOne);
router.delete('/:id', checkRole([Roles.ALLOW_ROLES_OPERATION]), roleController.deleteOne);
router.get('/data/export', checkRole([Roles.ALLOW_ROLES_OPERATION]), roleController.export);

export default router;
