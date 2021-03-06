import axios from 'axios';

class FetchApi {
  constructor() {
    this.ip = 'http://94.228.124.130:433/api/';
    this.admin = 'http://94.228.124.130:433/admin/';
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
      .then(response => response.data)
  }

  getSearchForm(search) {
    return axios.get(this.ip + 'directory/search', {
      params: {
        allSearch: search.allSearch,
        data: search.data,
        category: search.category,
      }
    })
      .then(response => response.data)
  }

  authSignIn(login, password) {
    return axios.post(this.admin + `signin?login=${login}&password=${password}`)
      .then(response => response.data);
  }

  authCheck() {
    return axios.post(this.admin + 'authcheck')
      .then(response => response.data)
  }
}

const fetchApi = new FetchApi();

export default fetchApi;