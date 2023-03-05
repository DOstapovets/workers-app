import type { Job, DoneCallback } from 'bull';
import type { UploadImageJobPayload } from 'app-types';

import sharp from 'sharp';
import axios from 'axios';
import { encode } from 'blurhash';

import { UploadModel } from 'app-db/dist/models';
import { JobType } from 'app-types';
import loggerFactory from 'app-logger';

const log = loggerFactory(JobType.UploadImage);

const host = 'http://super-app-web:8000';

const encodeImageToBlurhash = (url: string): Promise<string> =>
  new Promise((resolve, reject) => {
    axios
      .get(url, {
        responseType: 'arraybuffer',
      })
      .then(({ data: buffer }) => {
        sharp(buffer)
          .raw()
          .ensureAlpha()
          .resize(32, 32, { fit: 'inside' })
          .toBuffer((err, buff, { width, height }) => {
            if (err) return reject(err);

            resolve(encode(new Uint8ClampedArray(buff), width, height, 4, 4));
          });
      })
      .catch(reject);
  });

const uploadImageHandler = async (
  job: Job<UploadImageJobPayload>,
  next: DoneCallback,
) => {
  try {
    const { data } = job;

    log.info(`Starting upload image job: ${data.uploadId}`);

    const upload = await UploadModel.findById(data.uploadId);

    if (!upload) {
      log.error(`Upload not found: ${data.uploadId}`);
      return next(new Error(`Upload not found: ${data.uploadId}`));
    }

    const blurhash = await encodeImageToBlurhash(
      `${host}${upload.originalUrl}`,
    );

    upload.meta = {
      ...upload.meta,
      blurhash,
    };

    await upload.save();
    next();
  } catch (err) {
    log.error(err);
    next(err as Error);
  }
};

export default uploadImageHandler;
