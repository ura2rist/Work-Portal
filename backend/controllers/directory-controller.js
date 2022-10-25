const directoryService = require('../service/directory-service');

class DirectoryController {
  async addCategory(request, response, next) {
    try {
      const category = directoryService.addCategory(request.body.title);

      return response.json(category);
    } catch (error) {
      next(error);
    }
  }

  async removeCategory(request, response, next) {
    try {
      const category = directoryService.removeCategory(request.body.id);

      return response.json(category);
    } catch (error) {
      next(error);
    }
  }

  async changeCategory(request, response, next) {
    try {
      const category = directoryService.changeCategory(request.body);

      return response.json(category);
    } catch (error) {
      next(error);
    }
  }

  async addSubCategory(request, response, next) {
    try {
      const category = directoryService.addSubCategory(request.body);

      return response.json(category);
    } catch (error) {
      next(error);
    }
  }

  async removeSubCategory(request, response, next) {
    try {
      const subCategory = directoryService.removeSubCategory(request.body);

      return response.json(subCategory);
    } catch (error) {
      next(error);
    }
  }

  async changeSubCategory(request, response, next) {
    try {
      const subCategory = directoryService.changeSubCategory(request.body);

      return response.json(subCategory);
    } catch (error) {
      next(error);
    }
  }

  async addPeople(request, response, next) {
    try {
      const subCategory = directoryService.addPeople(request.body);

      return response.json(subCategory);
    } catch (error) {
      next(error);
    }
  }

  async removePeople(request, response, next) {
    try {
      const people = directoryService.removePeople(request.body);

      return response.json(people);
    } catch (error) {
      next(error);
    }
  }

  async getInfo(request, response, next) {
    try {
      const info = await directoryService.getInfo(request.body);

      return response.json(info);
    } catch (error) {
      next(error);
    }
  }

  async editPeople(request, response, next) {
    try {
      const info = await directoryService.editPeople(request.body.info);

      return response.json(info);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DirectoryController();