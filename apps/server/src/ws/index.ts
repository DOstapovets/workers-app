import { Server, Socket } from 'socket.io';

import loggerFactory from 'app-logger';
import query from 'app-queue';

const log = loggerFactory('WS');

export default {
  setup(io: Server) {
    io.on('connect', (socket: Socket) => {
      log.info(`Client connected: ${socket.id}`);
    });

    query.on('global:progress', (jobId, data) => {
      io.send({ jobId, data });
    });
  },
};
