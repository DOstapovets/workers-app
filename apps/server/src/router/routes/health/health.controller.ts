import { NextFunction, Response, Request } from 'express';

import loggerFactory from 'app-logger';

const log = loggerFactory('Health Ctrl');
export default {
  get(req: Request, res: Response, next: NextFunction) {
    try {
      log.debug('Get health');
      res.json('OK');
    } catch (err) {
      next(err);
    }
  },

  async getSession(req: Request, res: Response, next: NextFunction) {
    try {
      log.debug('Get session');

      const sessions = await req?.sessionService.getAll();

      res.json(sessions.map((session) => session?.toObject()));
    } catch (err) {
      next(err);
    }
  },
};
