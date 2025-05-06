import { Router } from "express";
import { signUp, signIn, uploadImage } from '../controllers/authController.js';
const router = Router();

router.post('/signup', upload.single('profileImage'),signUp);
router.post('/signin', signIn);
router.post('/users/me/avatar', upload.single('profileImage'), uploadProfileImage);

export default router;