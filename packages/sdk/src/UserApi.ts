import type { User } from 'app-types';
import BaseApi from './BaseApi';

export default class UserApi extends BaseApi {
  getUsers(): Promise<User[]> {
    return this.http.get('/user');
  }

  deleteUser(id: string): Promise<User> {
    return this.http.delete(`/user/${id}`);
  }
}
