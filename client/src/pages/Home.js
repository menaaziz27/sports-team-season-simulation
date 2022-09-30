import React, { useState, useEffect } from 'react';
import Button from '../Components/Button/Button';
import * as api from '../api';
import Message from '../Components/Message';
import TeamStatistics from '../Components/TeamStatistics/TeamStatistics';
import Loader from '../Components/Loader/Loader';

const Home = () => {
	// const [isLeagueStarted, setIsLeagueStarted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState(null);
	const [leagueResult, setLeagueResult] = useState([]);
	const [isLeagueStarted, setIsLeagueStarted] = useState(false);

	console.log({ leagueResult });
	console.log({ isLeagueStarted });

	const getLeagueResult = async () => {
		try {
			setIsLoading(true);
			const { data } = await api.getLeagueResult(); // all teams sorted by scores & goals.

			console.log({ data });
			if (data.length) {
				setLeagueResult(data);
				setIsLeagueStarted(true);
			}
			setIsLoading(false);
		} catch (e) {
			if (e?.response && e.response?.data?.message) {
				setMessage({ msgBody: e.response?.data.message });
			} else {
				setMessage({ msgBody: e?.data?.message });
			}
		}
	};

	useEffect(() => {
		getLeagueResult();
	}, []);

	useEffect(() => {
		// watch leagueResult if initialized then get first two teams and start a game between them and show the winner of championship
	}, [leagueResult]);

	// useEffect(() => {
	// 	const leagueStatus = async () => {
	// 		try {
	// 			setIsLoading(true);
	// 			const { data: league } = await api.getLeagueStatus();
	// 			console.log({ league });
	// 			if (league.length) setIsLeagueStarted(true);
	// 			setIsLoading(false);
	// 		} catch (e) {
	// 			if (e?.response && e.response?.data?.message) {
	// 				setMessage({ msgBody: e.response?.data.message });
	// 			} else {
	// 				setMessage({ msgBody: e?.data?.message });
	// 			}
	// 		}
	// 	};
	// 	leagueStatus();
	// }, []);

	const onStartSeasonHandler = async () => {
		setIsLoading(true);
		try {
			await api.startLeague();
			setIsLeagueStarted(true);
			await getLeagueResult();
			// startChmpionship based on league result
			// get league result
			// const [team1, team2] = await api.getLeagueResult()
			// api.startChampionship(team1, team2)
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
			{isLoading && <Loader />}
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
							<h1>
								Can you predict the result <span className="question-mark">? </span>
							</h1>
						</div>

						{message ? <Message message={message} /> : null}

						<div className="league__container container">
							{isLeagueStarted ? (
								<h3 className="league__status">League Result</h3>
							) : (
								<h3 className="league__status">Start Your League</h3>
							)}
							{isLeagueStarted &&
								leagueResult &&
								leagueResult?.map(({ _id, name, image, points, goals, numOfGames }, index) => (
									<TeamStatistics
										key={_id}
										_id={_id}
										name={name}
										image={image}
										points={points}
										goals={goals}
										numOfGames={numOfGames}
										index={index}
									/>
								))}
						</div>
						<div className="championship__container">
							{leagueResult ? <div>render Champion</div> : <div>No champion</div>}
						</div>
					</div>
				</main>
			)}
		</>
	);
};

export default Home;
