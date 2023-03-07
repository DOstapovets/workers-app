import { Router } from 'express';
import { passport } from '../../../utils/passport';

import multer from '../../../utils/multer';
import uploadsController from './uploads.controller';

const uploadRouter = Router();

uploadRouter.use(passport.authorize('jwt'));

uploadRouter.get('/', uploadsController.get);
uploadRouter.post('/', multer.single('file'), uploadsController.post);

export default uploadRouter;
