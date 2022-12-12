import { NextFunction, Response, Request } from 'express';

export default {
  get(req: Request, res: Response, next: NextFunction) {
    try {
      res.json('OK');
    } catch (err) {
      next(err);
    }
  },
};
