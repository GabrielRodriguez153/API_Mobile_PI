import express from "express";
import {
  analisarPlanta,
  getAnalisesHistoricas,
} from "../controllers/iaController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();
router.use(auth);
router.post("/analisar", analisarPlanta);
router.get("/historico/:farmId", getAnalisesHistoricas);

export default router;
