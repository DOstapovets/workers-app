import type { Logger } from 'winston';
import type socketIO from 'socket.io';

import Queue from 'app-queue';
import type { User as AppUser } from 'app-types';

import type Session from './utils/session';
import type { SessionService } from './utils/session/session.service';

declare global {
  namespace Express {
    export interface User extends AppUser {}
    export interface Request {
      log: Logger;
      user: AppUser;
      queue: typeof Queue;
      sessionService: SessionService;
      session: Session;
      io: socketIO.Server;
    }
  }
}

export {};
