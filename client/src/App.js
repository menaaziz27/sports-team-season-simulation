import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import PrivateRoute from './hocs/PrivateRoute';
import GamesPage from './pages/GamesPage';
import TeamsPage from './pages/TeamsPage';
import TeamDetails from './pages/TeamDetails/TeamDetails';
import './App.css';

function App() {
	return (
		<Router>
			<Navbar />
			<PrivateRoute exact path="/" component={Home} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/register" component={Register} />
			<PrivateRoute exact path="/games" component={GamesPage} />
			<PrivateRoute exact path="/teams" component={TeamsPage} />
			<PrivateRoute exact path="/teams/:id" component={TeamDetails} />
		</Router>
	);
}

export default App;
