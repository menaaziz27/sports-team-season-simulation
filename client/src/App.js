import React from 'react';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';
import PrivateRoute from './hocs/PrivateRoute';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GamesPage from './pages/GamesPage';
import TeamsPage from './pages/TeamsPage';
import './app.css';

function App() {
	return (
		<Router>
			<Navbar />
			<Route exact path="/" component={Home} />
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />
			<PrivateRoute path="/games" component={GamesPage} />
			<PrivateRoute path="/teams" component={TeamsPage} />
		</Router>
	);
}

export default App;
