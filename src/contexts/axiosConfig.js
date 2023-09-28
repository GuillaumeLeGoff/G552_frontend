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
    console.log("error.response", error.response);
    if (error.response && (error.response.status === 401)) {
      console.log("error.response.status === 401");
     localStorage.removeItem("user");
     window.location.reload();

      
    }
    return Promise.reject(error);
  }
);
