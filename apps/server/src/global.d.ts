import { User as AppUser } from 'app-types';

import type { Logger } from 'winston';
import type socketIO from 'socket.io';

import Queue from 'app-queue';

declare global {
  namespace Express {
    export interface User extends AppUser {}
    export interface Request {
      log: Logger;
      queue: typeof Queue;
      io: socketIO.Server;
    }
  }
}

export {};
