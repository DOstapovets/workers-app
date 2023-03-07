import type { Request } from 'express';
import type http from 'http';

import { Server, Socket } from 'socket.io';

import loggerFactory from 'app-logger';
import query from 'app-queue';
// import { sessionMiddleware } from '../utils/session';

const log = loggerFactory('WS');

let io: Server;

export const createWsServer = (server: http.Server) => {
  io = new Server(server);

  io.on('connect', (socket: Socket) => {
    log.info(`Client connected: ${socket.id}`);
  });

  query.on('global:progress', (jobId, data) => {
    io.send({ jobId, data });
  });
};

export const bindWsServer = (req: Request) => {
  req.io = io;
};
