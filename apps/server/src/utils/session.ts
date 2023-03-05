import session from 'express-session';
import RedisStore from 'connect-redis';
import redisClient from 'app-redis-client';

const sessionMiddleware = session({
  secret: 'SECRET',
  store: new RedisStore({ client: redisClient.duplicate() }),
  resave: false,
  saveUninitialized: false,
});

export default sessionMiddleware;
