import { Router } from 'express';
const router = Router();

// Controllers
import authController from '../controllers/auth.controller';

// Middlewares
import auth from '../middleware/auth.middleware';

// Routes
router.post('/login', authController.UserLogin);
router.post('/register', authController.UserRegister);
router.get('/get-user', auth, authController.GetUserFromToken);

export default router;
