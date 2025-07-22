import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://bqnl1vrju3.execute-api.eu-west-2.amazonaws.com/prod/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
