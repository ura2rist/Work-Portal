import axios from 'axios';

class FetchApi {
  constructor() {
    this.ip = 'http://94.228.124.130:433/api/';
  }

  getMenuItems() {
    return axios.get(this.ip + 'menu')
      .then(response => response.data)
  }

  getNewsItems(limit = 10, page = 1) {
    return axios.get(this.ip + 'news', {
      params: {
        limit: limit,
        page: page
      }
    })
      .then(response => response)
  }

  getEventsItems(limit = 8, page = 1) {
    return axios.get(this.ip + 'events', {
      params: {
        limit: limit,
        page: page
      }
    })
      .then(response => response)
  }

  getByIdNews(id) {
    return axios.get(this.ip + 'news/' + id)
      .then(response => response.data)
  }

  getAllCategory() {
    return axios.get(this.ip + 'directory/category')
      .then(response => response.data)
  }

  getCategory(category) {
    return axios.get(this.ip + 'directory/person')
      .then(response => response.data)
  }

  getDirectory(category, subCategory = null) {
    return axios.get(this.ip + 'directory/people', {
      params: {
        category: category,
        subCategory: subCategory
      }
    })
  }
}

const fetchApi = new FetchApi();

export default fetchApi;