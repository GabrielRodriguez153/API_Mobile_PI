import { Router } from "express";
import { getFAQs, askFAQ } from "../controllers/faqController";

const router = Router();

router.get("/faqs", getFAQs);
router.post("/faqs/ask", askFAQ);

export default router;