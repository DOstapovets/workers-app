import { Router } from 'express';
import { passport } from '../../../utils/passport';

import multer from '../../../utils/multer';
import uploadsController from './uploads.controller';

const uploadRouter = Router();

uploadRouter.get('/', uploadsController.get);
uploadRouter.post(
  '/',
  passport.authenticate('jwt'),
  multer.single('file'),
  uploadsController.post,
);

export default uploadRouter;
