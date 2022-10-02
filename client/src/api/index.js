import axios from 'axios';

const API = axios.create({
	withCredentials: true,
});

export const register = user => API.post(`/auth/register`, user);
export const login = user => API.post(`/auth/login`, user);
export const logout = () => API.get(`/auth/logout`);
export const isAuthenticated = () => API.get(`/users/authenticated`);
export const getTeams = () => API.get(`/teams`);
export const getTeamDetails = id => API.get(`/teams/${id}`);
export const getPlayer = id => API.get(`players/${id}`);
export const startLeague = () => API.get(`/leagues/start-league`);
export const getLeagueResult = () => API.get(`/leagues/result`);
export const startGame = (team1, team2) => API.get(`/games/start-game?team1=${team1}&team2=${team2}`);
export const startChampionship = (team1, team2) => API.get(`/champions/final?team1=${team1}&team2=${team2}`);
export const getAllGames = () => API.get('/games');
export const resetLeague = () => API.get('/leagues/reset');
