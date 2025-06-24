import express from 'express';
import { getTests, triggerTest, getTest } from '../controllers/testController';

const router = express.Router();

router.get('/:id', getTest);
router.get('/', getTests);
router.post('/', triggerTest);

export default router;
