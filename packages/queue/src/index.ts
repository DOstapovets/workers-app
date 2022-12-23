import Bull from 'bull';

import loggerFactory from 'app-logger';
import redisClient from 'app-redis-client';

const log = loggerFactory('Queue');

export default new Bull('default', {
  createClient: (type) => {
    switch (type) {
      case 'client':
        log.info('✔️ Connect as client to redis');
        return redisClient.duplicate();
      case 'subscriber':
        log.info('✔️ Connect as subscriber to redis');
        return redisClient.duplicate();
      default:
        log.info('✔️ Use a default redis connection');
        return redisClient;
    }
  },
});
