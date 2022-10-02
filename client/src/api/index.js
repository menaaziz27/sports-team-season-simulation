import axios from 'axios';

const API = axios.create({
	withCredentials: true,
});

export const register = user => API.post(`/api/auth/register`, user);
export const login = user => API.post(`/api/auth/login`, user);
export const logout = () => API.get(`/api/auth/logout`);
export const isAuthenticated = () => API.get(`/api/users/authenticated`);
export const getTeams = () => API.get(`/api/teams`);
export const getTeamDetails = id => API.get(`/api/teams/${id}`);
export const getPlayer = id => API.get(`/api/players/${id}`);
export const startLeague = () => API.get(`/api/leagues/start-league`);
export const getLeagueResult = () => API.get(`/api/leagues/result`);
export const startGame = (team1, team2) => API.get(`/api/games/start-game?team1=${team1}&team2=${team2}`);
export const startChampionship = (team1, team2) => API.get(`/api/champions/final?team1=${team1}&team2=${team2}`);
export const getAllGames = () => API.get('/api/games');
export const resetLeague = () => API.get('/api/leagues/reset');
