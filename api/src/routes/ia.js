import express from "express";
import {
  analisarPlanta,
  getAnalisesHistoricas,
} from "../controllers/iaController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();
router.post("/analisar", auth, analisarPlanta);
router.get("/historico/:farmId", auth, getAnalisesHistoricas);

export default router;
