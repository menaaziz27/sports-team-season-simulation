import React, { useState, useRef, useEffect } from 'react';
import Message from '../Components/Message';
import * as api from '../api';

const Register = props => {
	const [user, setUser] = useState({ name: '', password: '', email: '' });
	const [message, setMessage] = useState(null);
	let timerID = useRef(null);

	useEffect(() => {
		return () => {
			clearTimeout(timerID);
		};
	}, []);

	const onChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const resetForm = () => {
		setUser({ name: '', password: '', email: '' });
	};

	const onSubmit = async e => {
		e.preventDefault();
		try {
			await api.register(user);
			resetForm();
			setMessage({ msgBody: 'Account created successfully.' });
			timerID = setTimeout(() => {
				props.history.push('/login');
			}, 2000);
		} catch (e) {
			if (e.response && e.response.data.message) {
				setMessage({ msgBody: e.response.data.message });
			} else {
				setMessage({ msgBody: e.data.message });
			}
		}
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<h3>Please Register</h3>
				<label htmlFor="name" className="sr-only">
					Name:{' '}
				</label>
				<input
					type="text"
					name="name"
					value={user.name}
					onChange={onChange}
					className="form-control"
					placeholder="Enter name (admin/user)"
				/>
				<label htmlFor="email" className="sr-only">
					Email:{' '}
				</label>
				<input
					type="text"
					name="email"
					value={user.email}
					onChange={onChange}
					className="form-control"
					placeholder="Enter email"
				/>
				<label htmlFor="password" className="sr-only">
					Password:{' '}
				</label>
				<input
					type="password"
					name="password"
					value={user.password}
					onChange={onChange}
					className="form-control"
					placeholder="Enter Password"
				/>

				<button className="btn btn-lg btn-primary btn-block" type="submit">
					Register
				</button>
			</form>
			{message ? <Message message={message} /> : null}
		</div>
	);
};

export default Register;
