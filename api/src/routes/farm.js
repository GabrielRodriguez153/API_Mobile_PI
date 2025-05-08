import { Router } from "express";
import {createFarm,deleteFarm,getFarmById,getFarms,updateFarm} from "../controllers/farmController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.use(auth);
router.post("/", createFarm);
router.get("/", getFarms);
router.get("/:id", getFarmById);
router.put("/:id", updateFarm);
router.delete("/:id", deleteFarm);

export default router;