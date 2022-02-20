const	models = require('../models');
const bcrypt = require('bcrypt');
const timezone = require('moment-timezone');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
  async registration(login, password) {
    const user = await models.db.user.findOne({ where: { login: login } });

    if (user) {
      throw ApiError.BadRequest(`Пользователь с логином ${ login } уже существует`);
    }

    let salt = await bcrypt.genSaltSync(10);
    let passwordHash = await bcrypt.hashSync(password, salt);
    let date = await timezone.tz(new Date(), 'Europe/Moscow');

    const userNew = await models.db.user.create({
      login: login,
      password: passwordHash,
      date: date
    })

    const userDto = new UserDto(userNew);
    const tokens = tokenService.generateToken({...userDto});
    
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto};
  }

  async login(login, password) {
    const user = await models.db.user.findOne({ where: { login: login } });

    if (!user) {
        throw ApiError.BadRequest('Пользователь с таким логином не найден')
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
        throw ApiError.BadRequest('Неверный пароль');
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({...userDto});

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto}
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);

    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
        throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
        throw ApiError.UnauthorizedError();
    }

    const user = await models.db.user.findOne({ where: { id: userData.id } });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({...userDto});

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto};
  }

  async getAllUsers() {
    const users = await models.db.user.findAll();
    return users;
  }
}

module.exports = new UserService();