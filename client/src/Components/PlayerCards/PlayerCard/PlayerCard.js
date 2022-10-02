import React from 'react';

const PlayerCard = ({
	_id,
	name,
	age,
	stamina,
	speed,
	power,
	position,
	dribbling,
	strength,
	overall_power,
	avatar,
}) => {
	return (
		<div className="playercard">
			<div className="playercard__leftSide">
				<img src={avatar} alt="" className="playercard__img" />
				<p className="playercard__name">{name}</p>
			</div>
			<div className="playercard__rightSide">
				<div>
					<p>Age</p>
					<p>{age}</p>
				</div>
				<div>
					<p>Speed</p>
					<p>{speed}</p>
				</div>
				<div>
					<p>Stamina</p>
					<p>{stamina}</p>
				</div>
				<div>
					<p>Dribbling</p>
					<p>{dribbling}</p>
				</div>
				<div>
					<p>Strength</p>
					<p>{strength}</p>
				</div>
				<div>
					<p>Power</p>
					<p>{power}</p>
				</div>
				<div>
					<p>Position</p>
					<p>{position}</p>
				</div>
				<div>
					<p>Avg Power</p>
					<p>{overall_power}</p>
				</div>
			</div>
		</div>
	);
};

export default PlayerCard;
