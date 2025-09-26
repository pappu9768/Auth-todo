import express from 'express';
import { login, signup } from '../controllers/authControllers.js';
import { loginValidation, signupValidation } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup',signupValidation,signup);
router.post('/login',loginValidation,login);

export default router;