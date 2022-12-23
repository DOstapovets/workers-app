import type { Logger } from 'winston';
import type socketIO from 'socket.io';

import Queue from 'app-queue';

export {};

declare global {
  namespace Express {
    export interface Request {
      log: Logger;
      queue: typeof Queue;
      io: socketIO.Server;
    }
  }
}
