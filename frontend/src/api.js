import axios from 'axios';

// const API_URL = `${process.env.REACT_APP_API_URL}/api/auth`;

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const register = (userData) => axios.post(`${API_URL}/api/auth/register`, userData);
export const login = (userData) => axios.post(`${API_URL}/api/auth/login`, userData);
export const upload = (imageData) => axios.post(`${API_URL}/api/auth/predict`, imageData);
