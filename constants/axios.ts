import axios from 'axios';
import Constants from 'expo-constants';

const axiosInstance = axios.create({
  baseURL:  Constants.expoConfig?.extra?.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
