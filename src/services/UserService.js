import $api from "../http";

export default class UserService {
    static getUsers() {
        return $api.get('/users');
    }

    static async addUser(login, password) {
      return $api.post('/adduser', { login, password });
    }

    static async searchUser(name) {
      return $api.post('/searchuser', { name });
    }

    static async removeUser(id) {
      return $api.post('/removeUser', { id });
    }

    static async changeUser(id, data) {
      return $api.post('/changeUser', { id, data });
    }

    static async saveNews(data) {
      return $api.post('/savenews', { data });
    }
}