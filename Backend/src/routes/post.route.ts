import { Router } from 'express';
const router = Router();

// Utils
import { Roles } from '../utils/constants.util.js';

// Middlewares
import checkRole from '../middleware/check-role.middleware.js';
import UploadFiles from '../middleware/upload.middleware.js';

// Controllers
import postController from '../controllers/post.controller.js';

// Routes
router.get('/', checkRole([Roles.ALLOW_POSTS_VIEW]), postController.getAll);
router.get('/:id', checkRole([Roles.ALLOW_POSTS_OPERATION]), postController.getOne);
router.post(
  '/',
  checkRole([Roles.ALLOW_POSTS_OPERATION]),
  UploadFiles.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]),
  postController.createOne,
);
router.put(
  '/:id',
  checkRole([Roles.ALLOW_POSTS_OPERATION]),
  UploadFiles.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]),
  postController.updateOne,
);
router.delete('/:id', checkRole([Roles.ALLOW_POSTS_OPERATION]), postController.deleteOne);
router.get('/data/export', checkRole([Roles.ALLOW_POSTS_OPERATION]), postController.export);

export default router;
