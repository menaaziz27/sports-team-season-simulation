import React, { useState, useContext } from 'react';
// import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import { AuthContext } from '../Context/AuthContext';
import * as api from '../api';

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
			console.log({ e });
			if (e?.response && e.response?.data?.message) {
				setMessage({ msgBody: e.response?.data.message });
			} else {
				setMessage({ msgBody: e?.data?.message });
			}
		}
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<h3>Please sign in</h3>
				<label htmlFor="email" className="sr-only">
					Email:{' '}
				</label>
				<input type="text" name="email" onChange={onChange} className="form-control" placeholder="Enter email" />
				<label htmlFor="password" className="sr-only">
					Password:{' '}
				</label>
				<input
					type="password"
					name="password"
					onChange={onChange}
					className="form-control"
					placeholder="Enter Password"
				/>
				<button className="btn btn-lg btn-primary btn-block" type="submit">
					Log in{' '}
				</button>
			</form>
			{message ? <Message message={message} /> : null}
		</div>
	);
};

export default Login;
