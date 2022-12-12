import type { Logger } from 'winston';
import type socketIO from 'socket.io';

export {};

declare global {
  namespace Express {
    export interface Request {
      log: Logger;
      io: socketIO.Server;
    }
  }
}
