import { Router } from "express";
import {createFarm,deleteFarm,getFarmById,getFarms,updateFarm} from "../controllers/farmController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.use(auth);
router.post("/create", createFarm);
router.get("/", getFarms);
router.get("/farm/:id", getFarmById);
router.put("/farm/:id", updateFarm);
router.delete("/farm/:id", deleteFarm);

export default router;