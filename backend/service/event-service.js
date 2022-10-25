const models = require('../models');


class EventService {
  async saveEvent(data) {
    const news = await models.db.events.update(
      { title: data.data.title, content: data.data.content },
      { where: { id: data.data.id } }
    );

    return;
  }

  async removeEvent(id) {
    const news = await models.db.events.destroy({ where: { id: id } });

    return news;
  }
  
  async addEvent(data) {
    const now = new Date();

    const addEvent = await models.db.events.create({
      title: data.title,
      content: data.content,
      userId: data.id,
      date: now
    })
  }
}

module.exports = new EventService();
