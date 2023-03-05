import type { LoginPayload, User } from 'app-types';
import BaseApi from './BaseApi';

export default class AuthApi extends BaseApi {
  me(): Promise<User> {
    return this.http.get('/auth/me');
  }

  login(payload: LoginPayload): Promise<{ token: string }> {
    return this.http.post('/auth/login', payload);
  }
}
