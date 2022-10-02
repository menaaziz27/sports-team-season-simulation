import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import logo from '../../assets/logo.svg';
import './Navbar.css';
import * as api from '../../api';

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
					<Link to="/login" className="header__navLink">
						Login
					</Link>
				</li>
				<li>
					<Link to="/register" className="header__navLink">
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
					<Link to="/" className="header__navLink">
						Home
					</Link>
				</li>
				<li>
					<Link to="/games" className="header__navLink">
						Games
					</Link>
				</li>
				<li>
					<Link to="/teams" className="header__navLink">
						Teams
					</Link>
				</li>
				<li onClick={onClickLogoutHandler}>
					<Link to="/login" className="header__navLink">
						Logout
					</Link>
				</li>
			</>
		);
	};
	return (
		<header className="header">
			<div className={`container header__container`}>
				<Link to="/" className="link">
					<img src={logo} alt="header__logo" className="header__logo" />
				</Link>
				<ul className="header__mainNav">{!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}</ul>
			</div>
		</header>
	);
};

export default Navbar;
