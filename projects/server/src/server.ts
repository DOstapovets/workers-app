import http from 'http';
import express from 'express';
import socketIO from 'socket.io';

import router from './router';
import ws from './ws';
import config from './config';
import loggerFactory from './logger';

const log = loggerFactory('Server');
const app = express();
const server = http.createServer(app);
const io = new socketIO.Server(server);

ws.setup(io);

app.use((req, res, next) => {
  req.log = log;
  req.io = io;

  next();
});

app.use('/api', router);

const run = () => {
  server.listen(config.PORT, () => {
    log.info(`Listening http://localhost:${config.PORT}`);
  });
};

export { io, server, app, run };
