import type { LoginPayload, User } from 'app-types';

import store from '@/store';

import AppSdk from 'app-sdk';

export class AuthService {
  sdk: AppSdk;

  get token() {
    return localStorage.getItem('token');
  }

  set token(token: string | null) {
    if (!token) {
      localStorage.removeItem('token');
      store.commit('auth/setToken', null);
      return;
    }
    localStorage.setItem('token', token);
    store.commit('auth/setToken', token);
  }

  get user() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  set user(user: User | null) {
    if (!user) {
      localStorage.removeItem('user');
      store.commit('auth/setUser', null);
      return;
    }
    localStorage.setItem('user', JSON.stringify(user));
    store.commit('auth/setUser', user);
  }

  constructor() {
    this.sdk = new AppSdk(() => this.token);

    this.token = localStorage.getItem('token');
    this.sdk.http.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.token = null;
          this.user = null;
        }
      },
    );
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  async login(payload: LoginPayload) {
    const token = await this.sdk.api.auth.login(payload);

    this.token = token;

    await this.me();

    return token;
  }

  async me() {
    return this.sdk.api.auth.me().then((user) => {
      this.user = user;

      return user;
    });
  }

  async logout() {
    await this.sdk.api.auth.logout();

    this.token = null;
    this.user = null;
  }
}
