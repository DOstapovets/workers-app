import { Router } from 'express';
import userController from './user.controller';

const UserRouter = Router();

UserRouter.get('/', userController.get);
UserRouter.post('/', userController.post);
UserRouter.delete('/:id', userController.deleteOne);

export default UserRouter;
