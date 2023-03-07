import axios, { AxiosInstance } from 'axios';

import UserApi from './UserApi';
import AuthApi from './AuthApi';
import UploadApi from './UploadsApi';

export default class AppSdk {
  http: AxiosInstance;

  api: {
    user: UserApi;
    auth: AuthApi;
    upload: UploadApi;
  };

  constructor(tokenFactory: () => string | null) {
    const http = axios.create({ baseURL: '/api' });

    http.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${tokenFactory()}`;

      return config;
    });
    this.http = http;

    this.api = {
      user: new UserApi(http),
      auth: new AuthApi(http),
      upload: new UploadApi(http),
    };
  }
}
