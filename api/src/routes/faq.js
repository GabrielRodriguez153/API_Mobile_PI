import { Router } from "express";
import { getFAQs, askFAQ, createFAQ } from "../controllers/faqController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.use(auth);
router.get("/faqs", getFAQs);
router.post("/ask", askFAQ);
router.post("/create", createFAQ);

export default router;