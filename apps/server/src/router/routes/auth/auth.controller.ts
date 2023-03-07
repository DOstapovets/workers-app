import type { Request, Response, NextFunction } from 'express';

import loggerFactory from 'app-logger';

const log = loggerFactory('Auth Ctrl');

class AuthController {
  getMe(req: Request, res: Response, next: NextFunction) {
    try {
      log.debug('Get me');

      res.json(req.session.user);
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      log.debug('Logout');

      await req.session.logout();

      res.json('OK');
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
