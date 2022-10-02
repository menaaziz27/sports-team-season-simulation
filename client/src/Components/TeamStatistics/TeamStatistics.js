import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineSportsSoccer } from 'react-icons/md';

const TeamStatistics = ({ _id, name, points, goals, index }) => {
	return (
		<Link to={`/teams/${_id}`}>
			<div className="stats__card move-right">
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
					<div className="stats__card__goals">
						<MdOutlineSportsSoccer style={{ fontSize: '24px' }} /> <span>{goals}</span>
					</div>
					<div className="stats__card__points">
						PTS: <span>{points}</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default TeamStatistics;
