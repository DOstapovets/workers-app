import { Server, Socket } from 'socket.io';

import loggerFactory from 'app-logger';

const log = loggerFactory('WS');

export default {
  setup(io: Server) {
    io.on('connect', (socket: Socket) => {
      log.info(`Client connected: ${socket.id}`);
    });

    setInterval(() => {
      const randomNumber = Math.random() * 1000 - 500;

      io.send({ x: randomNumber, y: Date.now() });
    }, 300);
  },
};
