import loggerFactory from 'app-logger';

const log = loggerFactory('Worker');

setInterval(() => {
  log.info(Math.random() * 1000);
}, 2000);
