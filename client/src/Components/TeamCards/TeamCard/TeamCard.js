import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TeamCard.module.css';

const TeamCard = ({ _id, coach, name, image }) => {
	return (
		<div className={styles.card} style={{ width: '100%', height: '100%' }}>
			<img src={image} className={`${styles.card__img}`} alt={name} />
			<div className={styles.card__body}>
				<h5 className={styles.team__name}>{name}</h5>
				<p className={styles.team__coach}>
					Coach: <em>{coach}</em>
				</p>
				<Link to={`/teams/${_id}`} className={styles.card__btn}>
					More details
				</Link>
			</div>
		</div>
	);
};

export default TeamCard;
