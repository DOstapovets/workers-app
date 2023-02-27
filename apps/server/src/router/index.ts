import { Router } from 'express';
import { AuthRouter, HealthRouter, UserRouter } from './routes';

const router = Router();

router.use('/health', HealthRouter);
router.use('/user', UserRouter);
router.use('/auth', AuthRouter);

export default router;
