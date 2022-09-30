import React from 'react';
import { Link } from 'react-router-dom';
import '../teams.css';

const TeamCard = ({ _id, coach, name, image }) => {
	return (
		<div className="teams__card" style={{ width: '100%', height: '100%' }}>
			<img src={image} className="teams__card__img" alt={name} />
			<div className="teams__card__body">
				<h5 className="teams__card__name">{name}</h5>
				<p className="teams__card__coach">
					<em>Coach: {coach}</em>
				</p>
				<Link to={`/teams/${_id}`} className="teams__card__btn">
					More details
				</Link>
			</div>
		</div>
	);
};

export default TeamCard;
