import { Router } from 'express';
import { passport } from '../../../utils/passport';
import multer from '../../../utils/multer';
import userController from './user.controller';

const UserRouter = Router();

UserRouter.use(passport.authorize('jwt'));

UserRouter.get('/', userController.get);
UserRouter.post(
  '/',
  multer.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'avatar', maxCount: 1 },
  ]),
  userController.post,
);
UserRouter.patch('/:id', userController.patchOne);
UserRouter.delete('/:id', userController.deleteOne);

export default UserRouter;
