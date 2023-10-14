import { User } from 'app-types';
import type { Application, NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import {
  Strategy as JWTStrategy,
  ExtractJwt,
  VerifiedCallback,
} from 'passport-jwt';

import loggerFactory from 'app-logger';
import { compareHash } from './bcrypt';
import { sessionService } from './session/session.service';

import userService from '../router/routes/user/user.service';

const log = loggerFactory('auth');

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
      passReqToCallback: true,
    },
    // eslint-disable-next-line prefer-arrow-callback, func-names
    async function (req: Request, jwtPayload: any, done: VerifiedCallback) {
      try {
        log.debug('Verify JWT');

        const session = await sessionService.get(jwtPayload.sub);

        if (!session) return done(null, false);

        req.session = session;
        await session.touch();
        console.log(session);
        done(null, session?.user || false);
      } catch (err) {
        log.error((err as Error)?.message || err);
        done(err);
      }
    },
  ),
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      log.debug('Verify local');

      const user = await userService.getUser({ username });

      if (!user) return done(false);

      const { password: passHash, ...userWithoutPassword } =
        user?.toObject() as User;

      if (await compareHash(password, `${passHash}`)) {
        done(null, userWithoutPassword);
      } else {
        done(new Error('Incorrect username/password'));
      }
    } catch (err) {
      log.error((err as Error)?.message || err);
      done(err);
    }
  }),
);

const registerPassport = (app: Application) => {
  log.debug('Register passport');

  app.use(passport.initialize());
  app.use((req: Request, res: Response, next: NextFunction) => {
    req.sessionService = sessionService;

    next();
  });
};

const loginMiddleware = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate(
    'local',
    { session: false },
    async (error: any, user: User) => {
      log.info('Login local');

      if (error) return next(error);

      if (!user) return next(new Error('Incorrect username/password'));

      const sid = sessionService.generateSid();

      await sessionService.set(sid, { user, lastEnteredAt: Date.now() });

      const token = jwt.sign({ sub: sid }, 'your_jwt_secret');

      return res.json({ token });
    },
  )(req, res, next);

export { passport, registerPassport, loginMiddleware };
