import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://kn1kw5ee9i.execute-api.eu-west-2.amazonaws.com/prod',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
