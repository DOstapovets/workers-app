import path from 'path';
import http from 'http';
import express from 'express';
import morgan from 'morgan';
import socketIO from 'socket.io';

import queue from 'app-queue';
import loggerFactory from 'app-logger';
import * as config from 'app-config';

import router from './router';
import ws from './ws';

const log = loggerFactory('Server');
const app = express();
const server = http.createServer(app);
const io = new socketIO.Server(server);

ws.setup(io);
app.use(
  morgan('tiny', {
    stream: {
      write: (message) => log.http(message.trim()),
    },
  }),
);
app.use((req, res, next) => {
  req.log = log;
  req.io = io;
  req.queue = queue;

  next();
});

const staticPath = path.join(__dirname, '../../client/dist');

app.use(express.static(staticPath));

app.use('/api', router);

const run = () => {
  server.listen(config.port, () => {
    log.info(`Listening on http://localhost:${config.port}`);
  });
};

export { io, server, app, run };
