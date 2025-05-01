'use client';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // ✅ Your backend server URL
});

// Request Interceptor: Attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Unauthorized globally
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       localStorage.removeItem('admin-token');

//       toast.error('Session expired. Please login again.');

//       setTimeout(() => {
//         window.location.href = '/loginForm';
//       }, 1500);
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
