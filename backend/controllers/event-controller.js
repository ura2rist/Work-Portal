const eventService = require('../service/event-service');

class EventController {
  async saveEvent(request, response, next) {
    try {
      const news = await eventService.saveEvent(request.body);

      return response.json(news);
    } catch (error) {
      next(error);
    }
  }

  async removeEvent(request, response, next) {
    try {
      const events = await eventService.removeEvent(request.body.id);

      return response.json(events);
    } catch (error) {
      next(error);
    }
  }

  async addEvent(request, response, next) {
    try {
      const events = await eventService.addEvent(request.body);

      return response.json(events);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EventController();
