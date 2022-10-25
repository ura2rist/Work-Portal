const models = require('../models');

class NewsService {
  async saveNews(data) {
    const user = await models.db.user.findOne({ where: { login: data.data.author } });
   
    const news = await models.db.news.update(
      { title: data.data.title, content: data.data.content, userId: user ? user.dataValues.id : null },
      { where: { id: data.data.id } }
    );

    return;
  }

  async removeNews(id) {
    const news = await models.db.news.destroy({ where: { id: id } });

    return news;
  }
  
  async addNews(data) {
    const now = new Date();
    
    const addNews = await models.db.news.create({
      title: data.title,
      content: data.content,
      userId: data.id,
      date: now
    })
  }
}

module.exports = new NewsService();
