import express from 'express';
import authRoutes from './auth.mjs';
import userRoutes from './user.mjs';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
