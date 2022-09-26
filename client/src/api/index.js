import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const register = user => API.post(`auth/register`, user);
export const login = user => API.post(`auth/login`, user);
export const logout = () => API.get(`auth/logout`);
export const isAuthenticated = () => API.get(`users/authenticated`);
