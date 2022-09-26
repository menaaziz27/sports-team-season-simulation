import React from 'react';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Home from './Components/Home';
import Todos from './Components/Todos';
import Register from './Components/Register';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<Navbar />
			<Route exact path="/" component={Home} />
			<UnPrivateRoute path="/login" component={Login} />
			<UnPrivateRoute path="/register" component={Register} />
			<PrivateRoute path="/todos" roles={['user', 'admin']} component={Todos} />
		</Router>
	);
}

export default App;
