import { Router } from 'express';
import healthController from './health.controller';

const HealthRouter = Router();

HealthRouter.get('/', healthController.get);

export default HealthRouter;
