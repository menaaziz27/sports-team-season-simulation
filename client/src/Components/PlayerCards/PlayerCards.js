import React from 'react';
import PlayerCard from './PlayerCard/PlayerCard';
import './PlayerCards.css';

const PlayerCards = ({ players }) => {
	return (
		<div className="playercards__container container">
			{players?.map(
				({ _id, name, age, stamina, speed, strenght, avatar, dribbling, strength, power, overall_power, position }) => (
					<PlayerCard
						key={_id}
						_id={_id}
						name={name}
						age={age}
						stamina={stamina}
						speed={speed}
						strenght={strenght}
						avatar={avatar}
						dribbling={dribbling}
						strength={strength}
						position={position}
						power={power}
						overall_power={overall_power}
					/>
				)
			)}
		</div>
	);
};

export default PlayerCards;
