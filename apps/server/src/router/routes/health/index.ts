import { Router } from 'express';
import healthController from './health.controller';

const HealthRouter = Router();

HealthRouter.get('/', healthController.get);
HealthRouter.get('/session', healthController.getSession);

export default HealthRouter;
