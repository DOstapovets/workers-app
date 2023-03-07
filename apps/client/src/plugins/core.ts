import { AuthService } from '../core/auth';

const corePlugin = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  install(app: any) {
    const auth = new AuthService();

    app.config.globalProperties.$sdk = auth.sdk;
    app.config.globalProperties.$auth = auth;

    app.provide('sdk', auth.sdk);
    app.provide('auth', auth);
  },
};

export default corePlugin;
