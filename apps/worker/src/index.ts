import queue from 'app-queue';
import connectDB from 'app-db';
import loggerFactory from 'app-logger';
import { JobType } from 'app-types';

import uploadImageHandler from './workers/upload-image';

const log = loggerFactory('Worker');

connectDB().then(() => {
  log.info('Initialize worker');

  queue.process(JobType.UploadImage, 2, uploadImageHandler);
});
