import type { FilterQuery, AnyKeys, Types } from 'mongoose';
import { UploadModel, UserModel } from 'app-db/dist/models';
import loggerFactory from 'app-logger';
import type { User } from 'app-types';

import { generateHash } from '../../../utils/bcrypt';

const log = loggerFactory('UserSrv');

class UserService {
  getUsers(params: FilterQuery<User> = {}) {
    log.debug('Get Users');

    return UserModel.find(params, '-password').populate('avatar cover');
  }

  getUser(params: FilterQuery<User> = {}) {
    log.debug('Get User');

    return UserModel.findOne(params).populate('avatar cover');
  }

  getUserById(id: Types.ObjectId | string) {
    log.debug(`Get User(${id})`);

    return UserModel.findById(id).populate('avatar cover');
  }

  async createUser(params: AnyKeys<User>) {
    log.debug('Create User');

    const password = await generateHash(params.password);

    return UserModel.create({ ...params, password });
  }

  async updateUserById(id: string, data: AnyKeys<User>) {
    log.debug('Update User');

    if (data.avatar) {
      data.avatar = await UploadModel.findById(data.avatar);
    }

    return UserModel.findByIdAndUpdate(id, { $set: data }, { new: true });
  }

  deleteUserById(id: Types.ObjectId | string) {
    log.debug('Delete User');

    return UserModel.findByIdAndDelete(id, { returnDocument: 'before' });
  }
}

export default new UserService();
