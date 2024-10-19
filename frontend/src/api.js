import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth';

export const register = (userData) => axios.post(`${API_URL}/register`, userData);
export const login = (userData) => axios.post(`${API_URL}/login`, userData);
export const upload = (imageData) => axios.post(`${API_URL}/predict`, imageData);
