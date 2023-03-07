import type { User } from 'app-types';
import { AxiosInstance } from 'axios';

export default class UserApi {
  constructor(private http: AxiosInstance) {}

  getUsers(): Promise<User[]> {
    return this.http.get('/user');
  }

  deleteUser(id: string): Promise<User> {
    return this.http.delete(`/user/${id}`);
  }
}
