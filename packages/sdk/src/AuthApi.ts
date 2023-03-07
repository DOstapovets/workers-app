import { AxiosInstance } from 'axios';
import type { LoginPayload, User } from 'app-types';

export default class AuthApi {
  constructor(private http: AxiosInstance) {}

  me(): Promise<User> {
    return this.http.get<User>('/auth/me').then(({ data }) => data);
  }

  login(payload: LoginPayload) {
    return this.http
      .post<{ token: string }>('/auth/login', payload)
      .then(({ data }) => data.token);
  }

  logout(): Promise<void> {
    return this.http.post('/auth/logout');
  }
}
