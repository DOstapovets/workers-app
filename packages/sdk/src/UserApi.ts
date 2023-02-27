import BaseApi from './BaseApi';

export default class UserApi extends BaseApi {
  getUsers() {
    return this.http.get('/user');
  }
}
