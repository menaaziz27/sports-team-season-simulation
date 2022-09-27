import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
	}, []);
	return <div>{isLoading ? <div>Loading ..</div> : <div>{teamDetails.coach}</div>}</div>;
};

export default TeamDetails;
