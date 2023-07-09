import { Router } from 'express';
const router = Router();

// Controllers
import authController from '../controllers/auth.controller.js';

// Middlewares
import auth from '../middleware/auth.middleware.js';

// Routes
router.post('/login', authController.UserLogin);
router.post('/register', authController.UserRegister);
router.get('/get-user', auth, authController.GetUserFromToken);

export default router;
