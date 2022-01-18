const express = require('express');
const app = express();
const router = express.Router();
const models = require('../models');
const cors = require('cors');

router.get('/', cors(), (request, response, next) => {
  models.db.menu.findAll({raw: true, order: [
    ['position', 'ASC']
  ]})
    .then(menu=>{
      response.json(menu)
    })
    .catch(err=>console.log(err));
});

module.exports = router;