import { Router } from 'express';
const router = Router();

// Middlewares
import auth from '../middleware/auth.middleware';

// Routes
import userRoutes from './user.route';
import roleRoutes from './role.route';
import categoryRoutes from './category.route';
import postRoutes from './post.route';

// Routes
router.use('/users', auth, userRoutes);
router.use('/roles', auth, roleRoutes);
router.use('/categories', auth, categoryRoutes);
router.use('/posts', auth, postRoutes);

export default router;
