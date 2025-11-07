import express from "express";
import {
  analyzeImage,
  mobileHealthCheck,
} from "../controllers/mobileAnalysisController.js";

const router = express.Router();

// Rota para análise de imagem do mobile
router.post("/analyze", analyzeImage);

// Rota de health check específica para mobile
router.get("/health", mobileHealthCheck);

export default router;
