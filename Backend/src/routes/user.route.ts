import { Router } from 'express';
const router = Router();

// Utils
import { Roles } from '../utils/constants.util.js';

// Middlewares
import checkRole from '../middleware/check-role.middleware.js';
import UploadFiles from '../middleware/upload.middleware.js';

// Controllers
import userController from '../controllers/user.controller.js';

// Routes
router.get('/', checkRole([Roles.ALLOW_USERS_VIEW]), userController.getAll);
router.get('/:id', checkRole([Roles.ALLOW_USERS_OPERATION]), userController.getOne);
router.post(
  '/',
  checkRole([Roles.ALLOW_USERS_OPERATION]),
  UploadFiles.single('profilePicture'),
  userController.createOne,
);
router.put(
  '/:id',
  checkRole([Roles.ALLOW_USERS_OPERATION]),
  UploadFiles.single('profilePicture'),
  userController.updateOne,
);
router.delete('/:id', checkRole([Roles.ALLOW_USERS_OPERATION]), userController.deleteOne);
router.get('/data/export', checkRole([Roles.ALLOW_USERS_OPERATION]), userController.export);

export default router;
