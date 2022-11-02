const userService = require("../service/user-service");

class UserController {
  async registration(request, response, next) {
    try {
      const { login, password } = request.body;
      const userData = await userService.registration(login, password);
      
      response.cookie('refreshToken', userData.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true });
      return response.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async signin(request, response, next) {
    try {
      const { login, password } = request.body;
      const userData = await userService.login(login, password);

      response.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

      return response.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(request, response, next) {
    try {
      const { refreshToken } = request.cookies;
      const token = await userService.logout(refreshToken);

      response.clearCookie('refreshToken');

      return response.json(token);
    } catch (e) {
        next(e);
    }
  }

  async addUser(request, response, next) {
    try {
      const { login, password } = request.body;
      const userData = await userService.addUser(login, password);  

      return response.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async refresh(request, response, next) {
    try {
      const { refreshToken } = request.cookies;
      const userData = await userService.refresh(refreshToken);

      response.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

      return response.json(userData);
    } catch (e) {
        next(e);
    }
  }

  async getUsers(request, response, next) {
    try {
      const users = await userService.getAllUsers();
      
      return response.json(users);
    } catch (error) {
      next(error);
    }
  }

  async searchUser(request, response, next) {
    try {
      const users = await userService.searchUser(request.body.name);

      return response.json(users);
    } catch (error) {
      next(error);
    }
  }

  async removeUser(request, response, next) {
    try {
      const users = await userService.removeUser(request.body.id);

      return response.json(users);
    } catch (error) {
      next(error);
    }
  }

  async changeUser(request, response, next) {
    try {
      const users = await userService.changeUser(request.body.id, request.body.data);

      return response.json(users);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();