import type { FilterQuery, Types } from 'mongoose';

import fs from 'fs';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import queue from 'app-queue';
import { JobType, Upload } from 'app-types';
import { UploadModel } from 'app-db/dist/models';
import loggerFactory from 'app-logger';

const log = loggerFactory('UploadsService');

class UploadService {
  getUploads(params: FilterQuery<Upload> = {}) {
    return UploadModel.find(params)
      .populate('createdBy')
      .populate('createdBy.avatar', '-createdBy.password');
  }

  async uploadFileFromUrl(
    url: string,
    userId: Types.ObjectId | string,
  ): Promise<Upload> {
    return new Promise((resolve, reject) => {
      log.debug(`Uploading file from url: ${url}`);
      const filename = uuid();
      const originalUrl = `/uploads/${filename}`;
      const file = fs.createWriteStream(originalUrl);

      axios
        .get(url, { responseType: 'stream' })
        .then((res) => {
          res.data.pipe(file);

          res.data.on('end', async () => {
            const mimetype = res.headers['content-type'];

            const upload = await UploadModel.create({
              filename,
              mimetype,
              originalUrl,
              createdBy: userId,
            });

            await queue.add(JobType.UploadImage, { uploadId: upload._id });

            resolve(upload);
          });

          res.data.on('error', (err: Error) => {
            reject(err);
          });
        })
        .catch(reject);
    });
  }

  async uploadNewFile(
    { filename, mimetype, path }: Express.Multer.File,
    userId: Types.ObjectId | string,
  ) {
    log.debug(`Uploading file: ${filename}`);

    const upload = await UploadModel.create({
      filename,
      mimetype,
      originalUrl: path,
      createdBy: userId,
    });

    await queue.add(JobType.UploadImage, { uploadId: upload._id });

    return upload;
  }
}

export default new UploadService();
