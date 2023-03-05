import { Router } from 'express';

import routes from './routes';

const router = Router();

routes.forEach(([path, route]) => {
  router.use(path, route);
});

export default router;
