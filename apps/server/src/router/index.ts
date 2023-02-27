import { Router } from 'express';
import { HealthRouter, UserRouter } from './routes';

const router = Router();

router.use('/health', HealthRouter);
router.use('/user', UserRouter);

export default router;
