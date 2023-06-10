import { Router } from 'express';
const router = Router();

// Utils
import { Roles } from '../utils/constants.util';

// Middlewares
import checkRole from '../middleware/check-role.middleware';

// Controllers
import userController from '../controllers/user.controller';

// Routes
router.get('/', checkRole([Roles.ALLOW_USERS_VIEW]), userController.getAll);
router.get('/:id', checkRole([Roles.ALLOW_USERS_OPERATION]), userController.getOne);
router.post('/', checkRole([Roles.ALLOW_USERS_OPERATION]), userController.createOne);
router.put('/:id', checkRole([Roles.ALLOW_USERS_OPERATION]), userController.updateOne);
router.delete('/:id', checkRole([Roles.ALLOW_USERS_OPERATION]), userController.deleteOne);

export default router;
