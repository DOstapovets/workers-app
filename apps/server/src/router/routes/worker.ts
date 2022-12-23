import { Router } from 'express';
import workerController from '../../controllers/worker';

const WorkerRouter = Router();

WorkerRouter.post('/', workerController.post);

export default WorkerRouter;
