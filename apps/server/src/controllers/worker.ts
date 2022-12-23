import { NextFunction, Response, Request } from 'express';

export default {
  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const job = await req.queue.add('worker', { delay: 200 });
      res.json({
        jobId: job.id,
      });
    } catch (err) {
      next(err);
    }
  },
};
