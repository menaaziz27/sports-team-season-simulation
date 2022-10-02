import React, { useState, useContext } from 'react';
import Message from '../Components/Message';
import { AuthContext } from '../Context/AuthContext';
import * as api from '../api';
import { Link } from 'react-router-dom';

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
				setMessage({ msgError: e.response?.data.message });
			} else {
				setMessage({ msgError: e?.data?.message });
			}
		}
	};

	return (
		<div className="auth">
			<div className="auth__container container">
				<form onSubmit={onSubmit} className="auth__form">
					<h3 className="auth__text">Login</h3>
					<input
						type="text"
						name="email"
						onChange={onChange}
						className="form-control"
						placeholder="exmaple@email.com"
					/>
					<input type="password" name="password" onChange={onChange} className="form-control" placeholder="*********" />
					{message?.msgError || message?.msgBody ? <Message message={message} /> : null}
					<button className="btn primary" type="submit">
						Confirm{' '}
					</button>
					<Link to="/register" className="link">
						<p>Don't have an account ?</p>
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Login;
