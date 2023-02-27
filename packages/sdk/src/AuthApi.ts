import { LoginPayload } from 'app-types';
import BaseApi from './BaseApi';

export default class AuthApi extends BaseApi {
  me() {
    return this.http.get('/auth/me');
  }

  login(payload: LoginPayload) {
    return this.http.post('/auth/login', payload);
  }
}
