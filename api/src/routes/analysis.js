import { Router } from "express";
import { getDashboard, getComparison, getSummary } from "../controllers/analysisController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.use(auth);
router.get("/dashboard", getDashboard);
router.post("/compare", getComparison);
router.get("/summary", getSummary);

export default router;