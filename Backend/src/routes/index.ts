import { Router } from 'express';
const router = Router();

// Middlewares
import auth from '../middleware/auth.middleware';

// Routes
import dashboardRoutes from './dashboard.route';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import roleRoutes from './role.route';
import categoryRoutes from './category.route';
import postRoutes from './post.route';

// Routes
router.use('/dashboard', auth, dashboardRoutes);
router.use('/auth', authRoutes);
router.use('/users', auth, userRoutes);
router.use('/roles', auth, roleRoutes);
router.use('/categories', auth, categoryRoutes);
router.use('/posts', auth, postRoutes);

export default router;
