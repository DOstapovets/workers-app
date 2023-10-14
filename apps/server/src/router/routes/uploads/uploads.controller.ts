import type { Response, Request, NextFunction } from 'express';

import loggerFactory from 'app-logger';
import uploadsService from './uploads.service';

const log = loggerFactory('UploadsCtrl');

class UploadsController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      log.debug('Get uploads');

      const uploads = await uploadsService.getUploads();

      res.json(uploads);
    } catch (err) {
      next(err);
    }
  }

  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const { 
        file,
        session: { user },
        body
      } = req;

      log.debug('New upload');

      console.log(file);

      if (!user) throw new Error('No user');
      
      if (file) {
        const upload = await uploadsService.uploadNewFile(file, user._id);

        res.json(upload);
      } else if (body.url) {
        const upload = await uploadsService.uploadFileFromUrl(
          body.url,
          user._id,
        );

        res.json(upload);
      } else {
        throw new Error('No file or url');
      }

    } catch (err) {
      next(err);
    }
  }
}

export default new UploadsController();
