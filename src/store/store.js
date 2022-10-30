import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import axios from 'axios';
import UserService from '../services/UserService';
import DirectoryService from '../services/DirectoryService'

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
      localStorage.setItem('id', response.data.user.id);

      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async logout(login, password) {
    try {
      await AuthService.logout();
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
      await UserService.addUser(login, password);
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

  async addNewsPost(title, content, id) {
    try {
      const response = await UserService.addNewsPost(title, content, id);

      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
  
  async addEventPost(title, content, id) {
    try {
      const response = await UserService.addEventPost(title, content, id);

      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async removeEvent(id) {
    try {
      const response = await UserService.removeEvent(id);

      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async saveEvent(data) {
    try {
      const response = await UserService.saveEvent(data);

      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async addCategory(title) {
    try {
      const response = await DirectoryService.addCategory(title);
      
      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async removeCategory(id) {
    try {
      const response = await DirectoryService.removeCategory(id);

      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async changeCategory(id, title, position) {
    try {
      const response = await DirectoryService.changeCategory(id, title, position);

      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async addSubCategory(id, title) {
    try {
      const response = await DirectoryService.addSubCategory(id, title);

      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async removeSubCategory(catId, subCatId) {
    try {
      const response = await DirectoryService.removeSubCategory(catId, subCatId);
      
      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async changeSubCategory(id, title, position, catId) {
    try {
      const response = await DirectoryService.changeSubCategory(id, title, position, catId);
      
      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async addPeople(idCat, idSubCat, text) {
    try {
      const response = await DirectoryService.addPeople(idCat, idSubCat, text);
      
      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async removePeople(id, employe) {
    try {
      const response = await DirectoryService.removePeople(id, employe);
      
      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async getInfo(id) {
    try {
      const response = await DirectoryService.getInfo(id);
      
      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async editPeople(info) {
    try {
      const response = await DirectoryService.editPeople(info);
      
      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
}
