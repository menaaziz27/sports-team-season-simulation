import React, { useState, useContext } from 'react';
import Message from '../../Components/Message';
import { AuthContext } from '../../Context/AuthContext';
import * as api from '../../api';
import './Login.css';
import worldcupLogo from '../../assets/images/world-cup-svgrepo-com.svg';

const Login = props => {
	const [user, setUser] = useState({ email: '', password: '' });
	const [message, setMessage] = useState(null);
	const authContext = useContext(AuthContext);

	const onChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = async e => {
		e.preventDefault();
		try {
			const { data } = await api.login(user);
			const { user: loggedInUser } = data;
			authContext.setUser(loggedInUser);
			authContext.setIsAuthenticated(true);
			props.history.push('/');
		} catch (e) {
			if (e?.response && e.response?.data?.message) {
				setMessage({ msgBody: e.response?.data.message });
			} else {
				setMessage({ msgBody: e?.data?.message });
			}
		}
	};

	return (
		<div className="login">
			<div className="container login__container">
				<form onSubmit={onSubmit} className="login__form">
					<img src={worldcupLogo} alt="world cup" className="login__worldcup" />
					<h3 className="login__text">Please sign in</h3>
					<input
						type="text"
						name="email"
						onChange={onChange}
						className="form-control"
						placeholder="exmaple@email.com"
					/>
					<input type="password" name="password" onChange={onChange} className="form-control" placeholder="*********" />
					{message ? <Message message={message} /> : null}
					<button className="btn primary" type="submit">
						Log in{' '}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
