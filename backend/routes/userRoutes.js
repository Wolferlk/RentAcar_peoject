import express from 'express';
import { getProfile, getPastBookings } from '../controllers/userController.js';
const router = express.Router();

router.get('/profile', getProfile);
router.get('/bookings', getPastBookings);

export default router;