import { Router } from 'express';
import { HealthRouter, WorkerRouter } from './routes';

const router = Router();

router.use('/health', HealthRouter);
router.use('/worker', WorkerRouter);

export default router;
