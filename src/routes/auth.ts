import { Router } from 'express';
import { register, login, getMe } from '../controllers';
import { protect } from '../middleware';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);

export default router;
