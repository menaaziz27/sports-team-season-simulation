import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import * as api from '../api';

const PlayerDetails = () => {
	let { id } = useParams();
	const [player, setPlayer] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const getTeamDetails = async () => {
			try {
				if (id) {
					const { data } = await api.getPlayer(id);
					setPlayer(data);
					setIsLoading(false);
				}
			} catch (e) {
				console.log(e);
			}
		};

		getTeamDetails();
		return () => {
			setPlayer({});
		};
	}, []);

	return (
		<>
			{isLoading && <div>Loading ..</div>}
			{player && (
				<div className="player container">
					<img src={player.avatar} alt="avatar" />
					<h3>Name: {player.name}</h3>
					<p>Age: {player.age}</p>
					<p>Country: {player.country}</p>
					<p>Stamina: {player.stamina}</p>
					<p>Speed: {player.speed}</p>
					<p>Dribbling: {player.dribbling}</p>
					<p>Strenght: {player.strength}</p>
					<p>Power: {player.power}</p>
					<p>Overall Power{player.overall_power}</p>
					<p>Position: {player.position}</p>
					<p>Team: {player.team}</p>
				</div>
			)}
		</>
	);
};

export default PlayerDetails;
