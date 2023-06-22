import axios from 'axios';
import authService from '../services/authService';

axios.interceptors.request.use(
  (config) => {
    const accessToken = authService.getCurrentUser()?.accessToken;
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      authService.logout();
    }
    return Promise.reject(error);
  }
);
