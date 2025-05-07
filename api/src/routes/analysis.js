import { Router } from "express";
import { getDashboard, getComparison } from "../controllers/analysisController";
import auth from "../middlewares/auth.js";

const router = Router();

router.use(auth);
router.get("/analysis/dashboard", getDashboard);
router.post("/analysis/compare", getComparison);

export default router;