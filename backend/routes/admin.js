const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/authcheck', (request, response) => {
  response.json(true)
});

router.post('/registration', userController.registration);

router.post('/signin', userController.signin);

router.post('/logout', userController.logout);

router.get('/refresh', userController.refresh);

router.get('/users', authMiddleware , userController.getUsers);

router.post('/adduser', authMiddleware , userController.addUser);

router.post('/searchuser', authMiddleware, userController.searchUser);

router.post('/removeUser', authMiddleware, userController.removeUser);

router.post('/changeUser', authMiddleware, userController.changeUser);

module.exports = router;