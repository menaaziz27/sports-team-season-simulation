import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as api from '../../api';
import PlayerCards from '../../Components/PlayerCards/PlayerCards';
import PlayerCard from '../../Components/PlayerCards/PlayerCard/PlayerCard';
import './TeamDetails.css';

const TeamDetails = () => {
	let { id } = useParams();
	const [teamDetails, setTeamDetails] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const getTeamDetails = async () => {
			try {
				if (id) {
					const { data } = await api.getTeamDetails(id);
					console.log({ data });
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
	}, [id]);
	return (
		<>
			{isLoading && <div>Loading ..</div>}
			{teamDetails && (
				<>
					<div className="teamDetails">
						<div className="teamDetails__container container">
							<div className="teamDetails__topBar">
								<div className="leftSide">
									<img src={teamDetails?.image} alt="flag" className="teamDetails__leftSide__img" />
									<p className="teamDetails__leftSide__text">{teamDetails.name}</p>
								</div>
								<p className="teamDetails__topBar__points">
									Points: <span style={{ color: '#5dd9c1' }}>{teamDetails.points}</span>
								</p>
							</div>
						</div>
					</div>
					<PlayerCards players={teamDetails?.players} />
				</>
			)}
		</>
	);
};

export default TeamDetails;

{
	/* <div className="teamDetails__cards__card">
								<div className="card__img">
									<img src={player.avatar} alt="player_photo" />
								</div>
								<div className="card__content">
									<p className="card__name">Name: {player.name}</p>
									<p className="card__name">Position: {player.position}</p>
									<p className="card__name">total power: {player.overall_power}%</p>
								</div>
							</div> */
}
