import http from 'http';
import express from 'express';

import loggerFactory from 'app-logger';
import * as config from 'app-config';

import useMiddleware from './middleware';
import { createWsServer } from './ws';
import userService from './router/routes/user/user.service';

const app = express();
const log = loggerFactory('Server');
const server = http.createServer(app);

createWsServer(server);

useMiddleware(app);

const run = async () => {

  if (!await userService.getUsers().countDocuments()) {
    log.info('Creating default admin user');
    
    await userService.createUser({
      username: 'admin',
      password: 'admin',
    });
  }

  server.listen(config.port, () => {
    log.info(`Listening on http://localhost:${config.port}`);
  });
};

export default run;
