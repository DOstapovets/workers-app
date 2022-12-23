import loggerFactory from 'app-logger';
import queue from 'app-queue';

const log = loggerFactory('Worker');

function fibonacci(num: number, callback: () => void): number {
  if (num <= 1) return num;
  callback();
  return fibonacci(num - 1, callback) + fibonacci(num - 2, callback);
}

queue.process('worker', 2, (job, done) => {
  log.info(`Starting worker ${job.id}`);

  const randomNumber = Math.random() * 1000;
  fibonacci(randomNumber, () => {
    job.progress({ x: randomNumber, y: Date.now() });
  });

  log.info(`Finishing worker ${job.id}`);
  done();
});
