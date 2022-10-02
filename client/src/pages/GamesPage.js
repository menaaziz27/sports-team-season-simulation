import React, { useEffect, useState } from 'react';
import * as api from '../api';
import GameCard from '../Components/GameCard/GameCard';
import Loader from '../Components/Loader/Loader';

const GamesPage = () => {
	const [games, setGames] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getGames = async () => {
			try {
				const { data } = await api.getAllGames();
				setGames(data);
				setIsLoading(false);
			} catch (e) {
				console.log(e);
			}
		};

		getGames();
		return () => {
			setGames({});
		};
	}, []);
	return (
		<>
			{isLoading && <Loader />}
			{games?.length && (
				<>
					<div className="section-padding">
						<div className="games__container container">
							<h3 className="games__title highlight">League Matches</h3>
							{games.map(({ _id, team1, team2, team1_goals, team2_goals }) => (
								<GameCard key={_id} team1={team1} team2={team2} team1_goals={team1_goals} team2_goals={team2_goals} />
							))}
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default GamesPage;
