import { FilterQuery, AnyKeys, Types } from 'mongoose';
import { UserModel } from 'app-db/dist/models';
import loggerFactory from 'app-logger';
import type { User } from 'app-types';

import { generateHash } from '../../../utils/bcrypt';

const log = loggerFactory('UserSrv');

class UserService {
  getUsers(params: FilterQuery<User> = {}) {
    log.debug('Get Users');
    return UserModel.find(params);
  }

  getUser(params: FilterQuery<User> = {}) {
    log.debug('Get User');

    return UserModel.findOne(params);
  }

  getUserById(id: Types.ObjectId | string) {
    log.debug(`Get User(${id})`);
    return UserModel.findById(id);
  }

  async createUser(params: AnyKeys<User>) {
    log.debug('Create User');

    const passHash = await generateHash(params.passHash);

    return UserModel.create({ ...params, passHash });
  }

  deleteUserById(id: Types.ObjectId | string) {
    log.debug('Delete User');
    return UserModel.findByIdAndDelete(id, { returnDocument: 'before' });
  }
}

export default new UserService();
