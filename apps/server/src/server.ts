import path from 'path';
import http from 'http';
import express from 'express';
import morgan from 'morgan';
import socketIO from 'socket.io';

import loggerFactory from 'app-logger';

import router from './router';
import ws from './ws';
import config from './config';

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

  next();
});

const staticPath = path.join(__dirname, '../../client/dist');

log.info(`Define static path:${staticPath}`);
app.use(express.static(staticPath));

app.use('/api', router);

const run = () => {
  server.listen(config.port, () => {
    log.info(`Listening http://localhost:${config.port}`);
  });
};

export { io, server, app, run };
