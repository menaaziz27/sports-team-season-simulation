import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import styles from './Navbar.module.css';
import * as api from '../../api';
import logo from '../../assets/logo.svg';
const Navbar = props => {
	const { isAuthenticated, setIsAuthenticated, setUser } = useContext(AuthContext);

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
					<Link to="/login" className={styles.navLink}>
						Login
					</Link>
				</li>
				<li>
					<Link to="/register" className={styles.navLink}>
						Regsiter
					</Link>
				</li>
			</>
		);
	};

	const authenticatedNavBar = () => {
		return (
			<>
				<li>
					<Link to="/games" className={styles.navLink}>
						Games
					</Link>
				</li>
				<li>
					<Link to="/teams" className={styles.navLink}>
						Teams
					</Link>
				</li>
				<li onClick={onClickLogoutHandler}>
					<Link to="/login" className={styles.navLink}>
						Logout
					</Link>
				</li>
			</>
		);
	};
	return (
		<header className={styles.header}>
			<div className={`container ${styles.container}`}>
				<Link to="/" className={styles.logoLink}>
					<img src={logo} alt="logo" className={styles.logo} />
				</Link>
				<ul className={styles.mainNav}>{!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}</ul>
			</div>
		</header>
	);
};

export default Navbar;
