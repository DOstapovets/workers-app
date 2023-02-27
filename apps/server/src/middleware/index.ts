import type { Application } from 'express';

import path from 'path';
import morgan from 'morgan';
import express from 'express';

import queue from 'app-queue';
import loggerFactory from 'app-logger';

import router from '../router';
import { bindWsServer } from '../ws';
import sessionMiddleware from '../utils/session';

const log = loggerFactory('Middleware');

export default (app: Application) => {
  app.use(sessionMiddleware);

  app.use(
    morgan('tiny', {
      stream: {
        write: (message) => log.http(message.trim()),
      },
    }),
  );

  app.use((req, res, next) => {
    bindWsServer(req);
    req.log = loggerFactory('Request');
    req.queue = queue;

    next();
  });

  const staticPath = path.join(__dirname, '../../../client/dist');
  log.info(`Set static path ${staticPath}`);
  app.use(express.static(staticPath));

  app.use('/api', router);

  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
};
