const	models = require('../models');
const bcrypt = require('bcrypt');
const timezone = require('moment-timezone');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const Op = models.db.Sequelize.Op;

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

  async addUser(login, password) {
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

    return { user: userDto };
  }

  async searchUser(name) {
    const user = await models.db.user.findAll({ where: { login: { [Op.like]: `%${name}%` } } });

    return user;
  }

  async removeUser(id) {
    const user = await models.db.user.destroy({ where: { id: id } });

    return user;
  }

  async changeUser(id, data) {
    if(data.newLogin) {
      const user = await models.db.user.update({ login: data.newLogin }, { where: { id: id } });
    }

    if(data.newPassword) {
      let salt = await bcrypt.genSaltSync(10);
      let passwordHash = await bcrypt.hashSync(data.newPassword, salt);
      const password = await models.db.user.update({ password: passwordHash }, { where: { id: id } });
    }

    if(data.newFio) {
      const fullname = await models.db.person.findOne({ where: { fullName: data.newFio } });

      const fio = await models.db.user.update({ personId: fullname.id }, { where: { id: id } });
    }

    return;
  }
}

module.exports = new UserService();