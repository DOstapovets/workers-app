import type { NextFunction, Request, Response } from 'express';

import loggerFactory from 'app-logger';

import userService from './user.service';

const log = loggerFactory('UserCtrl');

class UserController {
  async get(req: Request, res: Response, next: NextFunction) {
    log.debug('Get users');
    try {
      const users = await userService.getUsers(req.query);

      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async post(req: Request, res: Response, next: NextFunction) {
    log.debug('Create user');
    try {
      const users = await userService.createUser(req.body);

      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    log.debug('Delete user');
    try {
      const user = await userService.deleteUserById(req.params.id);

      res.json(user);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
