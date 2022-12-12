import { Router } from 'express';
import { HealthRouter } from './routes';

const router = Router();

router.use('/health', HealthRouter);

export default router;
