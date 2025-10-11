import { Router } from 'express';
import { auth } from '../middleware/auth.mjs';
import { getUserProfile } from '../controllers/userController.mjs';

const router = Router();

// This is a protected route. Only authenticated users can access it.
router.get('/profile', auth, getUserProfile);

export default router;
