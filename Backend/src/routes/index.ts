import { Router } from 'express';
const router = Router();

// Routes
import userRoutes from './user.route';
import roleRoutes from './role.route';
import categoryRoutes from './category.route';
import postRoutes from './post.route';

// Routes
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/categories', categoryRoutes);
router.use('/posts', postRoutes);

export default router;
