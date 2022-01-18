const express = require('express');
const router = express.Router();
const models = require('../models');
const cors = require('cors');

router.get('/', cors(), (request, response, next) => {
  let { limit = 10, page = 1 } = request.query;
  limit = Number(limit);
  const offset = (page - 1) * limit;
  models.db.news.findAndCountAll({
    raw: true, 
    offset: offset, 
    limit: limit,
    order: [['id', 'DESC']], 
    include: {
      model: models.db.user, 
      attributes: ['login']
    }
  })
    .then((news) => {
      news.rows.map((item, index) => {
        news.rows[index].content = item.content.slice(0, 300);
        let date = new Date(item.date);
        news.rows[index].date = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getUTCHours()}:${date.getMinutes()}`;
      })
      response.json([ news.count, news.rows ]);
    })
    .catch(err=>console.log(err));
});

router.get('/:id', cors(), (request, response, next) => {
  models.db.news.findOne({
    where: {
      id: request.params.id
    }, 
    include: {
      model: models.db.user, 
      attributes: ['login']
    }
  })
  .then((news) => {
    let date = new Date(news.date);
    news = news.toJSON();
    news.date = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getUTCHours()}:${date.getMinutes()}`;
    response.json(news)
  })
  .catch(err=>console.log(err))
});

module.exports = router;