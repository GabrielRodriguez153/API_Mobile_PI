import { Router } from "express";
import { getFAQs, askFAQ } from "../controllers/faqController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.use(auth);
router.get("/faqs", getFAQs);
router.post("/faqs/ask", askFAQ);

export default router;