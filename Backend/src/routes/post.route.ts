import { Router } from 'express';
const router = Router();

// Middlewares
import UploadFiles from '../middleware/upload.middleware';

// Controllers
import postController from '../controllers/post.controller';

// Routes
router.get('/', postController.getAll);
router.get('/:id', postController.getOne);
router.post('/', UploadFiles.single('thumbnail'), postController.createOne);
router.put('/:id', UploadFiles.single('thumbnail'), postController.updateOne);
router.delete('/:id', postController.deleteOne);

export default router;
