const jwt = require('jsonwebtoken');
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require('../config');
const model = require('../models');

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '3h'});
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '10d'});

    return {
      accessToken,
      refreshToken
    };
  }

  validateAccessToken(token) {
    try {
        const userData = jwt.verify(token, JWT_ACCESS_SECRET);

        return userData;
    } catch (e) {
        return null;
    }
  }

  validateRefreshToken(token) {
      try {
          const userData = jwt.verify(token, JWT_REFRESH_SECRET);

          return userData;
      } catch (e) {
          return null;
      }
  }

  async saveToken(userId, refreshToken) {
    model.token.token.update({ token: refreshToken }, {
      where: {
        userId: userId
      }
    })
    .then((token) => {
      if(token.length > 0) {
        model.token.token.create({ userId: userId, token: refreshToken })
          .then((createToken) => {
            return createToken;
          })
          .catch(err=>console.log(err));
      } else {
        return token;
      }
    })
    .catch(err=>console.log(err));
  }

  async removeToken(refreshToken) {
    const tokenData = await model.token.token.destroy( { where: { token: refreshToken} } );

    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await model.token.token.findOne( { where: { token: refreshToken} } );

    return tokenData;
  }
}

module.exports = new TokenService();