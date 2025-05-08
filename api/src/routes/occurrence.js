import { Router } from 'express';
import { getHistory, getStatsByAge, getStatsByDate, getOccurrenceSummary } from '../controllers/occurrenceController.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.use(auth);
router.get("/history", getHistory);
router.get("/by-age", getStatsByAge);
router.get("/by-date", getStatsByDate);
router.get("/summary", getOccurrenceSummary);

export default router;