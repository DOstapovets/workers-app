import Redis from 'ioredis';

import loggerFactory from 'app-logger';
import { redisHost, redisPassword } from 'app-config';

const log = loggerFactory('RedisClient');

const redisClient = new Redis({
  host: redisHost,
  password: redisPassword,
  name: 'mymaster',
  sentinels: [
    {
      host: redisHost,
    },
  ],
  sentinelPassword: redisPassword,
  showFriendlyErrorStack: true,
  reconnectOnError: (err) => {
    const targetError = 'READONLY';
    log.error(err.message);

    return err.message.includes(targetError);
  },
});

export default redisClient;
