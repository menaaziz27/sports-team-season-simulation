import React, { useState, useRef, useEffect } from 'react';
import Message from '../Components/Message';
import * as api from '../api';
import { Link } from 'react-router-dom';
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
		<div className="auth">
			<div className="auth__container container">
				<form onSubmit={onSubmit} className="auth__form">
					<h3 className="auth__text">Create an account</h3>
					<input type="text" name="name" onChange={onChange} className="form-control" placeholder="John Doe" />
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
						Register{' '}
					</button>
					<Link to="/login" className="link">
						<p>Already have an account?</p>
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Register;
