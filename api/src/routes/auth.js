import { Router } from "express";
import { signUp, signIn } from '../controllers/authController.js';
import { auth } from "../middlewares/auth.js";

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);


export default router;