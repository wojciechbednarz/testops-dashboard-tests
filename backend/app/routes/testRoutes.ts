import express from 'express';
import { getTests, getTest, triggerTest } from '../controllers/testController';

const router = express.Router();

router.get('/api/test:id', getTest);
router.get('/api/tests', getTests);
router.post('/api/tests', triggerTest);

export default router;
