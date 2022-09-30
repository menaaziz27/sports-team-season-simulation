import React from 'react';
import { Link } from 'react-router-dom';

const TeamStatistics = ({ _id, name, image, points, goals, numOfGames, index }) => {
	return (
		<Link to={`/teams/${_id}`}>
			<div className="stats__card">
				<div className="stats__card__left">
					<div
						className="stats__card__rank"
						alt="team rank"
						style={
							index === 0
								? { backgroundColor: '#FFD700' }
								: index === 1
								? { backgroundColor: '#C0C0C0' }
								: index === 2
								? { backgroundColor: '#CD7F32' }
								: { backgroundColor: '#acfcd9' }
						}>
						{index + 1}
					</div>
					<div className="stats__card__name">{name}</div>
				</div>
				<div className="stats__card__right">
					<div className="goals">goal: {goals}</div>
					<div className="points">pts: {points}</div>
				</div>
			</div>
		</Link>
	);
};

export default TeamStatistics;
