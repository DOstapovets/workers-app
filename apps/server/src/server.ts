import http from 'http';
import express from 'express';

import loggerFactory from 'app-logger';
import * as config from 'app-config';

import useMiddleware from './middleware';
import { createWsServer } from './ws';

const log = loggerFactory('Server');
const app = express();
const server = http.createServer(app);

createWsServer(server);

useMiddleware(app);

const run = () => {
  server.listen(config.port, () => {
    log.info(`Listening on http://localhost:${config.port}`);
  });
};

export default run;
