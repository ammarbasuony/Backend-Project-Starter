import { Router } from 'express';
const router = Router();

// Controllers
import authController from '../controllers/auth.controller';

// Routes
router.post('/login', authController.UserLogin);
router.post('/register', authController.UserRegister);

export default router;
