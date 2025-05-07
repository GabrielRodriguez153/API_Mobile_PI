import { Router } from "express";
import { getProfile, updateProfile, updateImage } from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import { uploadImages } from "../controllers/authController";

const router = Router();

router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);
router.post("/profile/avatar", auth, updateImage, uploadImages);

export default router;