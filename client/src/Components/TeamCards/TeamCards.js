import React, { useEffect, useState } from 'react';
import TeamCard from './TeamCard/TeamCard';
import Loader from '../../Components/Loader/Loader';

import './teams.css';
import * as api from '../../api';

const TeamCards = () => {
	const [teams, setTeams] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getAllteams = async () => {
			const { data } = await api.getTeams();
			setTeams(data);
			setIsLoading(false);
		};
		getAllteams();
	}, []);

	return (
		<div className="teams">
			{isLoading ? (
				<Loader />
			) : (
				teams?.map(({ _id, coach, name, image }) => (
					<TeamCard key={_id} _id={_id} coach={coach} name={name} image={image} />
				))
			)}
		</div>
	);
};

export default TeamCards;
