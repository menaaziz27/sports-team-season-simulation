import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlayerCards from '../../Components/PlayerCards/PlayerCards';
import Loader from '../../Components/Loader/Loader';

import * as api from '../../api';
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
			{isLoading && <Loader />}
			{teamDetails && (
				<>
					<div className="teamDetails__container container">
						<div className="teamDetails__topBar">
							<div className="teamDetails__leftSide">
								<img src={teamDetails?.image} alt="flag" className="teamDetails__leftSide__img" />
								<p className="teamDetails__leftSide__text">{teamDetails.name}</p>
							</div>
							<p className="teamDetails__rightSide__points">
								Team Points (<span style={{ color: '#5dd9c1' }}>{teamDetails.points}</span>)
							</p>
						</div>
					</div>
					<PlayerCards players={teamDetails?.players} />
				</>
			)}
		</>
	);
};

export default TeamDetails;
