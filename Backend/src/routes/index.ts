import { Router } from 'express';
const router = Router();

// Middlewares
import auth from '../middleware/auth.middleware.js';

// Routes
import dashboardRoutes from './dashboard.route.js';
import authRoutes from './auth.route.js';
import userRoutes from './user.route.js';
import roleRoutes from './role.route.js';
import categoryRoutes from './category.route.js';
import postRoutes from './post.route.js';

// Routes
router.use('/dashboard', auth, dashboardRoutes);
router.use('/auth', authRoutes);
router.use('/users', auth, userRoutes);
router.use('/roles', auth, roleRoutes);
router.use('/categories', auth, categoryRoutes);
router.use('/posts', auth, postRoutes);

export default router;
