import { Router } from "express";
import * as farmCont from "../controllers/farmController.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.use(auth);
router.post("/farms", farmCont.createFarm);
router.get("/farms", farmCont.getFarms);
router.get("/farms/:id", farmCont.getFarmById);
router.put("/farms/:id", farmCont.updateFarm);
router.delete("/farms/:id", farmCont.deleteFarm);

export default router;