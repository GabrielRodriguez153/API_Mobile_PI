import { Router } from 'express';
import { getHistory, getStatsByAge } from '../controllers/occurrenceController';
import auth from '../middlewares/auth.js';

const router = Router();

router.use(auth);
router.get("/occurrences/history", getHistory);
router.get("/occurrences/by-age", getStatsByAge);

export default router;