import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import axios from 'axios';
import $api from '../http';
import UserService from '../services/UserService';

export default class Store {
  isAuth = false;
  user = {};

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }

  async login(login, password) {
    try {
      const response = await AuthService.login(login, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async logout(login, password) {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get(`https://94.228.124.130:433/admin/refresh`, { withCredentials: true });
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async addUser(login, password) {
    try {
      const response = await UserService.addUser(login, password);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async getUsers() {
    try {
      const response = await UserService.getUsers();

      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async searchUser(name) {
    try {
      const response = await UserService.searchUser(name);

      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async removeUser(id) {
    try {
      const response = await UserService.removeUser(id);

      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async changeUser(id, data) {
    try {
      const response = await UserService.changeUser(id, data);

      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async saveNews(data) {
    try {
      const response = await UserService.saveNews(data);

      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async removeNews(id) {
    try {
      const response = await UserService.removeNews(id);

      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async getAccountId(token) {
    try {
      // получение id аккаунта
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
}
