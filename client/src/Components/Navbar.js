import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import * as api from '../api';

const Navbar = props => {
	const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

	const onClickLogoutHandler = async () => {
		try {
			const { data } = await api.logout();
			setUser(data.user);
			setIsAuthenticated(false);
		} catch (e) {
			console.log(e);
		}
	};

	const unauthenticatedNavBar = () => {
		return (
			<>
				<Link to="/">
					<li className="nav-item nav-link">Home</li>
				</Link>
				<Link to="/login">
					<li className="nav-item nav-link">Login</li>
				</Link>
				<Link to="/register">
					<li className="nav-item nav-link">Register</li>
				</Link>
			</>
		);
	};

	const authenticatedNavBar = () => {
		return (
			<>
				<Link to="/">
					<li className="nav-item nav-link">Games</li>
				</Link>
				<Link to="/todos">
					<li className="nav-item nav-link">Teams</li>
				</Link>
				{user?.role === 'admin' ? (
					<Link to="/admin">
						<li className="nav-item nav-link">Admin</li>
					</Link>
				) : null}
				<button type="button" className="btn btn-link nav-item nav-link" onClick={onClickLogoutHandler}>
					Logout
				</button>
			</>
		);
	};
	return (
		<nav class="navbar navbar-expand-lg navbar-light bg-light mx-auto">
			<Link to="/">
				<div className="navbar-brand">Soccer Season</div>
			</Link>
			<button
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarTogglerDemo02"
				aria-controls="navbarTogglerDemo02"
				aria-expanded="false"
				aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarTogglerDemo02">
				<ul class="navbar-nav ml-auto mt-2 mt-lg-0">
					{!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
