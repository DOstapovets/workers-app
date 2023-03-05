import UserApi from './UserApi';
import AuthApi from './AuthApi';
import UploadApi from './UploadsApi';

export default class AppSdk {
  api: {
    user: UserApi;
    auth: AuthApi;
    upload: UploadApi;
  };

  constructor(tokenFactory: () => string | null) {
    this.api = {
      user: new UserApi(tokenFactory),
      auth: new AuthApi(tokenFactory),
      upload: new UploadApi(tokenFactory),
    };
  }
}
