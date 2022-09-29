import React from 'react';
import Button from '../../Components/Button/Button';
import styles from './Home.module.css';
const Home = () => (
	<main className="section-padding">
		<div className={`container ${styles.container}`}>
			<div className={styles.startSeason}>
				<Button className={`${styles.btn}`} primary text="Start Season" />
				<h1>Can we predict the result?</h1>
			</div>
		</div>
	</main>
);

export default Home;
