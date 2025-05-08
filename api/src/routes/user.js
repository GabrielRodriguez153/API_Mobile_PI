import { Router } from "express";
import { getProfile, updateProfile, updateImage, selectFarm } from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";
import { uploadImages } from "../controllers/authController.js";

const router = Router();

router.use(auth);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.patch("/profile/avatar", updateImage, uploadImages);
router.patch("/select-farm", selectFarm);

export default router;