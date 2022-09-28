import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';
import PrivateRoute from './hocs/PrivateRoute';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GamesPage from './pages/GamesPage';
import TeamsPage from './pages/TeamsPage';
import './App.css';
import TeamDetails from './pages/TeamDetails';

function App() {
	return (
		<Router>
			<Navbar />
			<Route exact path="/" component={Home} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/register" component={Register} />
			{/* <PrivateRoute path="/games" component={GamesPage} /> */}
			<PrivateRoute exact path="/teams" component={TeamsPage} />
			<PrivateRoute exact path="/teams/:id" component={TeamDetails} />
		</Router>
	);
}

export default App;
