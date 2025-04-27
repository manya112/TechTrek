import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Your Flask backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
  // Adding timeout and withCredentials for better debugging
  timeout: 10000,
  withCredentials: false,
});

// Add a request interceptor to include JWT token in each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    console.log('Axios interceptor - token exists:', !!token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add token to the Authorization header
    }
    console.log('Axios request config:', config.url);
    return config;
  },
  (error) => {
    console.error('Axios request interceptor error:', error);
    return Promise.reject(error); // Handle any errors during the request
  }
);

// Add a response interceptor for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Axios response received for:', response.config.url);
    return response;
  },
  (error) => {
    console.error('Axios response error:', {
      url: error.config?.url,
      message: error.message,
      status: error.response?.status
    });
    return Promise.reject(error);
  }
);

export default axiosInstance;
