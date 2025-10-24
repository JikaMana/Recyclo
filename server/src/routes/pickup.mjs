import { Router } from 'express';
import {
  createPickupRequest,
  getAllPickups,
} from '../controllers/pickupController.mjs';

const router = Router();

router.post('/new-request', createPickupRequest);
router.get('/', getAllPickups);

export default router;
