import express from 'express';
import { addCar, getCars, getCarById } from '../controllers/carController.js';
const router = express.Router();

router.post('/add', addCar);
router.get('/', getCars);
router.get('/:id', getCarById);

export default router;