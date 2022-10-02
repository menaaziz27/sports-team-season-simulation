import React from 'react';
import './GameCard.css';

const GameCard = ({ team1, team2, team1_goals, team2_goals }) => {
	return (
		<div className="game__card move-right">
			<div className="game__card__left item">
				<img src={team1.image} alt={team1.name} className="game__card__img" />
				<p className="game__card__name">{team1.name}</p>
			</div>
			<div className="game__card__mid item">
				<p className="game__card__score">{team1_goals}</p>
				<p className="game__card__dots">:</p>
				<p className="game__card__score">{team2_goals}</p>
			</div>
			<div className="game__card__right item">
				<p className="game__card__name">{team2.name}</p>
				<img src={team2.image} alt={team2.name} className="game__card__img" />
			</div>
		</div>
	);
};

export default GameCard;
