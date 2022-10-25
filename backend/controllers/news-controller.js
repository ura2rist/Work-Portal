const newsService = require('../service/news-service');

class NewsController {
  async saveNews(request, response, next) {
    try {
      const news = await newsService.saveNews(request.body);

      return response.json(news);
    } catch (error) {
      next(error);
    }
  }

  async removeNews(request, response, next) {
    try {
      const news = await newsService.removeNews(request.body.id);

      return response.json(news);
    } catch (error) {
      next(error);
    }
  }

  async addnews(request, response, next) {
    try {
      const news = await newsService.addNews(request.body);

      return response.json(news);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NewsController();
