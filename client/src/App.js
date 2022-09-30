import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import PrivateRoute from './hocs/PrivateRoute';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GamesPage from './pages/GamesPage';
import TeamsPage from './pages/TeamsPage';
import './App.css';
import TeamDetails from './pages/TeamDetails/TeamDetails';
import PlayersPage from './pages/PlayersPage';
import PlayerDetails from './pages/PlayerDetails';
import GameDetails from './pages/GameDetails';

function App() {
	// useEffect(() => {
	// 	document.querySelector('html').style.scrollBehavior = 'auto';
	// 	window.scroll({ top: 0 });
	// 	document.querySelector('html').style.scrollBehavior = '';
	// }, [location.pathname]); // triggered on route change

	return (
		<Router>
			<Navbar />
			<PrivateRoute exact path="/" component={Home} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/register" component={Register} />
			<PrivateRoute exact path="/games" component={GamesPage} />
			<PrivateRoute exact path="/games/:id" component={GameDetails} />
			<PrivateRoute exact path="/teams" component={TeamsPage} />
			<PrivateRoute exact path="/teams/:id" component={TeamDetails} />
			<PrivateRoute exact path="/players" component={PlayersPage} />
			<PrivateRoute exact path="/players/:id" component={PlayerDetails} />
		</Router>
	);
}

export default App;
