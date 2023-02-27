import loggerFactory from 'app-logger';
import queue from 'app-queue';

const log = loggerFactory('Worker');

log.info('Init worker');
queue.process('worker', 2, (job, done) => {
  log.info(`Starting worker ${job.id}`);

  log.info(`Finishing worker ${job.id}`);
  done();
});
