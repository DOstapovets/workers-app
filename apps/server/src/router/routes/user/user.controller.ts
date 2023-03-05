import type { User } from 'app-types';
import type { NextFunction, Request, Response } from 'express';
import loggerFactory from 'app-logger';

import userService from './user.service';
import uploadsService from '../uploads/uploads.service';

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
      const { files, body } = req;
      const imageKeys = ['avatar', 'cover'] as ('avatar' | 'cover')[];
      const { avatar, cover, ...params } = body;

      const user = await userService.createUser(params);

      if (files && !Array.isArray(files) && Object.keys(files).length) {
        log.debug('Upload files');

        const uploadsPromises = imageKeys.map(async (key) => {
          if (files[key]?.length) {
            return uploadsService
              .uploadNewFile(files[key][0], user.id)
              .then((upload) => {
                (user as User)[key] = upload;
              });
          }

          return Promise.resolve();
        });

        await Promise.all(uploadsPromises);

        await user.save();
      } else if (avatar || cover) {
        log.debug('Upload files from url');

        const uploadsPromises = imageKeys.map(async (key) => {
          if (body[key]) {
            return uploadsService
              .uploadFileFromUrl(body[key], user.id)
              .then((upload) => {
                (user as User)[key] = upload;
              });
          }
        });

        await Promise.all(uploadsPromises);

        await user.save();
      }

      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async patchOne(req: Request, res: Response, next: NextFunction) {
    log.debug('Update user');
    try {
      const updatedUser = await userService.updateUserById(
        req.params.id,
        req.body,
      );

      return res.json(updatedUser);
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
