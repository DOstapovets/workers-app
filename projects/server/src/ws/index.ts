import { Server, Socket } from 'socket.io';

import loggerFactory from '../logger';

const log = loggerFactory('WS');

export default {
  setup(io: Server) {
    io.on('connect', (socket: Socket) => {
      log.info(`Client connected: ${socket.id}`);
    });
  },
};
