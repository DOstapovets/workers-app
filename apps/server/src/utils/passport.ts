import { User } from 'app-types';
import type { Application, NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

import loggerFactory from 'app-logger';
import { compareHash } from './bcrypt';

import userService from '../router/routes/user/user.service';

const log = loggerFactory('auth');

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    async (jwtPayload, done) => {
      try {
        log.info('Verify jwt');

        const user = await userService.getUserById(jwtPayload.sub);

        done(null, user || false);
      } catch (err) {
        done(err);
      }
    },
  ),
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      log.info('Verify local');

      const user = await userService.getUser({ username });

      if (!user) done(false);

      if (await compareHash(password, `${user?.password}`)) {
        done(null, user?.toObject());
      } else {
        done(false);
      }
    } catch (err) {
      done(err);
    }
  }),
);

passport.serializeUser((user: Express.User, cb) => {
  log.debug(`Serialize user ${user._id}`);
  cb(null, (user as User)._id);
});

passport.deserializeUser(async (id: string, cb) => {
  log.debug('Deserialize user');

  const user = await userService.getUserById(id);

  cb(null, user);
});

const registerPassport = (app: Application) => {
  log.debug('Register passport');

  app.use(passport.initialize());
  app.use(passport.session());
};

const loginMiddleware = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate(
    'local',
    { session: false },
    (error: any, user: User) => {
      log.info('Login local');

      if (error) return next(error);

      if (!user) {
        return res.status(401).send('Unauthorized');
      }

      req.logIn(user, (err) => {
        if (err) return next(err);

        const token = jwt.sign({ sub: user._id }, 'your_jwt_secret');

        return res.json({ token });
      });
    },
  )(req, res, next);

export { passport, registerPassport, loginMiddleware };
