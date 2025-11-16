import express from "express";
import {
  upsertStats,
  getStatsByFarm,
} from "../controllers/sectorStatsController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.use(auth);

router.post("/sector", upsertStats);
router.get("/sectors/:farmId", getStatsByFarm);

export default router;
