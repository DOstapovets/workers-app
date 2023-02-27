import type { AxiosInstance } from 'axios';
import axios from 'axios';

class BaseApi {
  http: AxiosInstance;

  constructor(tokenFactory: () => string | null) {
    this.http = axios.create({ baseURL: '/api' });

    this.http.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${tokenFactory()}`;

      return config;
    });
  }
}

export default BaseApi;
