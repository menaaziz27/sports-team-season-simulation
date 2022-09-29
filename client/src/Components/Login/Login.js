import React, { useState, useContext } from 'react';
// import AuthService from '../Services/AuthService';
import Message from '../Message';
import { AuthContext } from '../../Context/AuthContext';
import * as api from '../../api';
import styles from './Login.module.css';
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
			console.log({ user });
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
		<div className={styles.login}>
			<div className={`container ${styles.container}`}>
				<form onSubmit={onSubmit} className={styles.form}>
					<h3 className={styles.header}>Please sign in</h3>
					<input
						type="text"
						name="email"
						onChange={onChange}
						className={styles['form-control']}
						placeholder="exmaple@email.com"
					/>
					<input
						type="password"
						name="password"
						onChange={onChange}
						className={styles['form-control']}
						placeholder="*********"
					/>
					{message ? <Message message={message} /> : null}
					<button className={styles.btn} type="submit">
						Log in{' '}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
