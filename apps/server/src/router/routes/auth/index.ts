import { Router } from 'express';
import { loginMiddleware, passport } from '../../../utils/passport';
import authController from './auth.controller';

const AuthRouter = Router();

AuthRouter.get('/me', passport.authorize('jwt'), authController.getMe);
AuthRouter.post('/login', loginMiddleware);
AuthRouter.post('/logout', passport.authorize('jwt'), authController.logout);

export default AuthRouter;
