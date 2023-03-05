import { Router } from 'express';
import HealthRouter from './health';
import UserRouter from './user';
import AuthRouter from './auth';
import UploadsRouter from './uploads';

const routes: [string, Router][] = [
  ['/health', HealthRouter],
  ['/user', UserRouter],
  ['/auth', AuthRouter],
  ['/uploads', UploadsRouter],
];

export default routes;
