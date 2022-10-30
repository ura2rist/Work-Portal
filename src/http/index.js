import axios from 'axios';

export const ADMIN_URL = 'http://94.228.124.130:433/admin/';

const $api = axios.create({
  withCredentials: true,
  baseURL: ADMIN_URL
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
})

export default $api;