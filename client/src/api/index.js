import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000', withCredentials: true });

export const register = user => API.post(`auth/register`, user);
export const login = user => API.post(`auth/login`, user);
export const logout = () => API.get(`auth/logout`);
export const isAuthenticated = () => API.get(`users/authenticated`);
export const getTeams = () => API.get(`teams`);
export const getTeamDetails = id => API.get(`teams/${id}`);
export const getPlayer = id => API.get(`players/${id}`);
export const getLeagueStatus = () => API.get(`leagues/status`);
export const startLeague = () => API.get(`leagues/start-league`);
export const getLeagueResult = () => API.get(`leagues/result`);
export const startGame = (team1, team2) => API.get(`games/start-game?team1=${team1}&team2=${team2}`);
