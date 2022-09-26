export default {
	login: user => {
		console.log(user);
		return fetch('/auth/login', {
			method: 'post',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(res => {
			if (res.status !== 401) return res.json().then(data => data);
			else return { isAuthenticated: false, user: { username: '', role: '' } };
		});
	},
	register: user => {
		return fetch('/auth/register', {
			method: 'post',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(data => data)
			.catch(
				e =>
					new Promise((resolve, reject) => {
						reject(e);
					})
			);
	},
	logout: () => {
		return fetch('/users/logout')
			.then(res => res.json())
			.then(data => data);
	},
	isAuthenticated: () => {
		return fetch('/users/authenticated').then(res => {
			if (res.status !== 401) return res.json().then(data => data);
			else return { isAuthenticated: false, user: { username: '', role: '' } };
		});
	},
};
