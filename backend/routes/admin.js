const express = require('express');
const router = express.Router();
const	models = require('../models');
const cors = require('cors');
const bcrypt = require('bcrypt');
const userController = require('../controllers/user-controller');

router.post('/authcheck', (request, response) => {
  response.json(true)
});

router.post('/registration', userController.registration);

router.post('/signin', userController.signin);

router.post('/logout', userController.logout);

router.get('/refresh', userController.refresh);

router.get('/users', userController.getUsers);



module.exports = router;