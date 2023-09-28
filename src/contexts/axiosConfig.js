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

    console.log("test",error.response);
    if (error.response && (error.response.status === 401 || error.response.status === 500)) {
      console.log("test02",error.response);
      authService.logout();
    }
    return Promise.reject(error);
  }
);
