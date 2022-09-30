import React, { useState, useEffect } from 'react';
import Button from '../../Components/Button/Button';
import './Home.css';
import * as api from '../../api';
import Message from '../../Components/Message';

const Home = () => {
	// const [isLeagueStarted, setIsLeagueStarted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState(null);

	// useEffect(() => {
	// 	const getLeagueStatus = async () => {
	// 		const { data: league } = await api.getLeagueStatus();
	// 		if (league.isStarted) setIsLeagueStarted(true);
	// 		setIsLoading(false);
	// 	};

	// 	getLeagueStatus();
	// }, []);

	const onStartSeasonHandler = async () => {
		// // if league is already started
		// if (isLeagueStarted) return <Message message={{ msgBody: 'League already started' }} />;
		// start new league
		// set loading to true
		setIsLoading(true);
		try {
			const result = await api.startLeague();
			console.log({ result });
			// setLeagueResult()
			setIsLoading(false);
		} catch (e) {
			if (e?.response && e.response?.data?.message) {
				setMessage({ msgBody: e.response?.data.message });
			} else {
				setMessage({ msgBody: e?.data?.message });
			}
		}
	};
	return (
		<>
			{isLoading && <div>Loading ...</div>}
			{!isLoading && (
				<main className="section-padding">
					<div className="container home__container">
						<div className="start-season">
							<Button
								className="btn season-btn"
								primary
								text="Start Season"
								onStartSeasonHandler={onStartSeasonHandler}
							/>
							<h1>Can we predict the result?</h1>
							{message ? <Message message={message} /> : null}
						</div>
					</div>
				</main>
			)}
		</>
	);
};

export default Home;
