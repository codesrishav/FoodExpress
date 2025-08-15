import axios from 'axios';

const API = axios.create({
  baseURL: 'https://foodexpress-server.onrender.com/api', // Match this with backend prefix
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;

