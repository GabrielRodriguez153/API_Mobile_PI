import { Router } from "express";
import { getDashboard, getComparison, getSummary, createAnalyses } from "../controllers/analysisController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.use(auth);
router.post('/add', createAnalyses);
router.get("/dashboard", getDashboard);
router.post("/compare", getComparison);
router.get("/summary", getSummary);

export default router;