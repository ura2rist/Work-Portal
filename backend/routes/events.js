const express = require('express');
const router = express.Router();
const models = require('../models');
const cors = require('cors');

router.get('/', cors(), (request, response, next) => {
  console.log(request.query)
  let { limit = 8, page = 1 } = request.query;
  limit = Number(limit);
  const offset = (page - 1) * limit;
  models.db.events.findAndCountAll({
    raw: true, 
    offset: offset, 
    limit: limit,
    order: [['id', 'DESC']]
  })
    .then((event) => {
      event.rows.map((item, index) => {
        let date = new Date(item.date);
        event.rows[index].date = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getUTCHours()}:${date.getMinutes()}`;
      })
      response.json([ event.count, event.rows ]);
    })
    .catch(err=>console.log(err));
});

router.get('/:id', cors(), (request, response, next) => {
  models.db.events.findOne({
    where: {
      id: request.params.id
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