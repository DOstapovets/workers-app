import type { Request, Response, NextFunction } from 'express';

import loggerFactory from 'app-logger';

const log = loggerFactory('Auth Ctrl');

class AuthController {
  getMe(req: Request, res: Response, next: NextFunction) {
    try {
      log.info('Get me');
      res.json(req.user);
    } catch (err) {
      next(err);
    }
  }
}
export default new AuthController();
