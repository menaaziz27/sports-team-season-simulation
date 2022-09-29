import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as api from '../api';

const TeamDetails = () => {
	let { id } = useParams();
	const [teamDetails, setTeamDetails] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const getTeamDetails = async () => {
			try {
				if (id) {
					const { data } = await api.getTeamDetails(id);
					setTeamDetails(data);
					setIsLoading(false);
				}
			} catch (e) {
				console.log(e);
			}
		};

		getTeamDetails();
		return () => {
			setTeamDetails({});
		};
	}, []);
	return (
		<>
			{isLoading && <div>Loading ..</div>}
			{teamDetails && (
				<div className="container">
					<div className="topBar">
						<div className="leftSide">
							<img src="" alt="flag" />
							<p>Barcelona</p>
						</div>

						<p>Points: {teamDetails.points}</p>
					</div>
					<div className="cards">
						{teamDetails.players.map(player => (
							<Link to={`/players/${player._id}`}>
								<div className="card">
									<div className="card__img">
										<img src={player.avatar} alt="player_photo" />
									</div>
									<div className="card__content">
										<p className="card__name">Name: {player.name}</p>
										<p className="card__name">Position: {player.position}</p>
										<p className="card__name">total power: {player.overall_power}%</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default TeamDetails;
