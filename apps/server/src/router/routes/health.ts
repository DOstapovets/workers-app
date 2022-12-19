import { Router } from 'express';
import health from '../../controllers/health';

const HealthRouter = Router();

HealthRouter.get('/', health.get);

export default HealthRouter;
