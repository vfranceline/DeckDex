import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const authController = new AuthController();

// publicas
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// privadas
router.get('/users/profile', authMiddleware, authController.getProfile);

export { router };