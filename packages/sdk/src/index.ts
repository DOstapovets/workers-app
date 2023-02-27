import UserApi from './UserApi';
import AuthApi from './AuthApi';

export default class AppSdk {
  api: {
    user: UserApi;
    auth: AuthApi;
  };

  constructor(tokenFactory: () => string | null) {
    this.api = {
      user: new UserApi(tokenFactory),
      auth: new AuthApi(tokenFactory),
    };
  }
}
