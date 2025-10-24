import express from 'express';
import authRoutes from './auth.mjs';
import userRoutes from './user.mjs';
import pickupRoutes from './pickup.mjs';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/pickups', pickupRoutes);

export default router;
