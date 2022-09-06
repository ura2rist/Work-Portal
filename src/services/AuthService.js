import $api from "../http";

export default class AuthService {
  static async login(login, password) {
    return $api.post('/signin', {login, password});
  };

  static async registration(login, password) {
    return $api.post('/registration', {login, password});
  };

  static async logout() {
    return $api.post('/logout');
  };
}

