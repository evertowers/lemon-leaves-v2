import axios from 'axios';

// const API_URL = `${process.env.REACT_APP_API_URL}/api/auth`;

const API_URL = process.env.REACT_APP_API_URL || "https://legal-tammi-student0617-c9760f79.koyeb.app";

export const register = (userData) => axios.post("https://legal-tammi-student0617-c9760f79.koyeb.app/api/auth/register", userData);
export const login = (userData) => axios.post("https://legal-tammi-student0617-c9760f79.koyeb.app/api/auth/login", userData);
export const upload = (imageData) => axios.post("https://legal-tammi-student0617-c9760f79.koyeb.app/api/auth/predict", imageData);
