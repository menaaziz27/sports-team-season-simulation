import React, { createContext, useState, useEffect } from 'react';
import * as api from '../api';

export const AuthContext = createContext();

export default ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const checkUserAuthentication = async () => {
			try {
				const { data } = await api.isAuthenticated();
				console.log({ data });
				setUser(data.user);
				setIsAuthenticated(true);
				setIsLoaded(true);
			} catch (e) {
				setIsLoaded(true);
				setIsAuthenticated(false);
				setUser({ name: '', email: '' });
			}
		};
		checkUserAuthentication();
	}, []);

	return (
		<div>
			{!isLoaded ? (
				<h1>Loading</h1>
			) : (
				<AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
					{children}
				</AuthContext.Provider>
			)}
		</div>
	);
};
