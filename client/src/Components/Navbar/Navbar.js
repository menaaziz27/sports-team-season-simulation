import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import './Navbar.css';
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
					<Link to="/login" className="nav-link">
						Login
					</Link>
				</li>
				<li>
					<Link to="/register" className="nav-link">
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
					<Link to="/games" className="nav-link">
						Games
					</Link>
				</li>
				<li>
					<Link to="/teams" className="nav-link">
						Teams
					</Link>
				</li>
				<li onClick={onClickLogoutHandler}>
					<Link to="/login" className="nav-link">
						Logout
					</Link>
				</li>
			</>
		);
	};
	return (
		<header className="header">
			<div className={`container header__container`}>
				<Link to="/" className="logo-link">
					<img src={logo} alt="logo" className="logo" />
				</Link>
				<ul className="main-nav">{!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}</ul>
			</div>
		</header>
	);
};

export default Navbar;
