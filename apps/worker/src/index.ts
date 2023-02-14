import loggerFactory from 'app-logger';
import queue from 'app-queue';

const log = loggerFactory('Worker');

// function fibonacci(num: number, callback: () => void): number {
//   if (num <= 1) return num;
//   callback();
//   return fibonacci(num - 1, callback) + fibonacci(num - 2, callback);
// }
log.info('Init worker');
queue.process('worker', 2, (job, done) => {
  log.info(`Starting worker ${job.id}`);

  let counter = 0;
  const randomNumber = Math.random() * 1000;
  // fibonacci(randomNumber, () => {
  //   job.progress({ x: randomNumber, y: Date.now() });
  // });

  const interval = setInterval(() => {
    counter += 1;
    job.progress({ x: randomNumber + Math.random() * 500, y: Date.now() });
    if (counter > 50) clearInterval(interval);
  }, 200);

  log.info(`Finishing worker ${job.id}`);
  done();
});
