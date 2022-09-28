import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import styles from './Navbar.module.css';
import * as api from '../../api';

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
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to="/register">Regsiter</Link>
				</li>
			</>
		);
	};

	const authenticatedNavBar = () => {
		return (
			<>
				<li>
					<Link to="/teams">Teams</Link>
				</li>
				<li onClick={onClickLogoutHandler}>
					<Link>Logout</Link>
				</li>
			</>
		);
	};
	return (
		<header className={styles.header}>
			<div className={`container ${styles.container}`}>
				<div className="text-3xl font-bold underline">
					<a href="/">Soccer Season</a>
				</div>
				<ul className={styles.mainNav}>{!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}</ul>
			</div>
		</header>
		// <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto">
		// 	<Link to="/">
		// 		<div className="navbar-brand">Soccer Season</div>
		// 	</Link>
		// 	<button
		// 		className="navbar-toggler"
		// 		type="button"
		// 		data-toggle="collapse"
		// 		data-target="#navbarTogglerDemo02"
		// 		aria-controls="navbarTogglerDemo02"
		// 		aria-expanded="false"
		// 		aria-label="Toggle navigation">
		// 		<span className="navbar-toggler-icon"></span>
		// 	</button>

		// 	<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
		// 		<ul className="navbar-nav ml-auto mt-2 mt-lg-0">
		// 			{!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
		// 		</ul>
		// 	</div>
		// </nav>
	);
};

export default Navbar;
