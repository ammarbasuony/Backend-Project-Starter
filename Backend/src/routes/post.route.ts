import { Router } from 'express';
const router = Router();

// Utils
import { Roles } from '../utils/constants.util';

// Middlewares
import checkRole from '../middleware/check-role.middleware';
import UploadFiles from '../middleware/upload.middleware';

// Controllers
import postController from '../controllers/post.controller';

// Routes
router.get('/', checkRole([Roles.ALLOW_POSTS_VIEW]), postController.getAll);
router.get('/:id', checkRole([Roles.ALLOW_POSTS_OPERATION]), postController.getOne);
router.post('/', checkRole([Roles.ALLOW_POSTS_OPERATION]), UploadFiles.single('thumbnail'), postController.createOne);
router.put('/:id', checkRole([Roles.ALLOW_POSTS_OPERATION]), UploadFiles.single('thumbnail'), postController.updateOne);
router.delete('/:id', checkRole([Roles.ALLOW_POSTS_OPERATION]), postController.deleteOne);
router.get('/data/export', checkRole([Roles.ALLOW_POSTS_OPERATION]), postController.export);

export default router;
