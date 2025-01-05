import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/auth`;

export const register = (userData) => axios.post(`${API_URL}/register`, userData);
export const login = (userData) => axios.post(`${API_URL}/login`, userData);
export const upload = (imageData) => axios.post(`${API_URL}/predict`, imageData);
