import loggerFactory from 'app-logger';
import redisClient from 'app-redis-client';

const log = loggerFactory('Worker');
redisClient.set('test', Date.now());
setInterval(async () => {
  const result = await redisClient.get('test');
  log.info(result);
  log.info(Math.random() * 1000);
}, 2000);
