import React, { useEffect, useState } from 'react';
import * as api from '../../api';
import TeamCard from './TeamCard/TeamCard';
import './teams.css';

const TeamCards = () => {
	const [teams, setTeams] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getAllteams = async () => {
			const { data } = await api.getTeams();
			console.log(data);
			setTeams(data);
			setIsLoading(false);
		};
		getAllteams();
	}, []);

	return (
		<div className="teams">
			{isLoading ? (
				<div className="container">Loading ...</div>
			) : (
				teams?.map(({ _id, coach, name, image }) => (
					<TeamCard key={_id} _id={_id} coach={coach} name={name} image={image} />
				))
			)}
		</div>
	);
};

export default TeamCards;
