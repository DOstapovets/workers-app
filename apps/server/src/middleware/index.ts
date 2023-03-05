import type { Application, Request, Response, NextFunction } from 'express';

import path from 'path';
import morgan from 'morgan';
import express from 'express';

import queue from 'app-queue';
import loggerFactory from 'app-logger';

import router from '../router';
import { bindWsServer } from '../ws';
import sessionMiddleware from '../utils/session';
import { registerPassport } from '../utils/passport';

const log = loggerFactory('Middleware');

export default (app: Application) => {
  // Register body parser middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Register session middleware
  app.use(sessionMiddleware);

  // Register passport middleware
  registerPassport(app);

  // Log http requests
  app.use(
    morgan('tiny', {
      stream: {
        write: (message) => log.http(message.trim()),
      },
    }),
  );

  // Bind logger and queue to request
  app.use((req, res, next) => {
    bindWsServer(req);
    req.log = loggerFactory('Request');
    req.queue = queue;

    next();
  });

  // Set static folders
  const staticPath = path.join(__dirname, '../../../client/dist');
  const uploadsPath = '/uploads';
  log.info(`Set static path: ${staticPath}`);
  log.info(`Set uploads path: ${uploadsPath}`);
  app.use(express.static(staticPath));
  app.use('/uploads', express.static(uploadsPath));
  app.get('/uploads/*', (req, res) => {
    res.status(404).json({ message: 'File not found' });
  });

  // Use api routes
  app.use('/api', router);

  // Catch all other routes and return the index file
  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });

  //  Error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(err);

    res.status(400).json({ message: err?.message });
  });
};
