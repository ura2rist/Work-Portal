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
}

const fetchApi = new FetchApi();

export default fetchApi;