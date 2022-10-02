import React, { useState, useEffect } from 'react';
import Button from '../Components/Button/Button';
import Message from '../Components/Message';
import TeamStatistics from '../Components/TeamStatistics/TeamStatistics';
import Loader from '../Components/Loader/Loader';
import * as api from '../api';

const Home = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState(null);
	const [leagueResult, setLeagueResult] = useState([]);
	const [isLeagueStarted, setIsLeagueStarted] = useState(false);
	const [championData, setChampionData] = useState({});

	const getResult = async () => {
		try {
			const { data } = await api.getLeagueResult();
			if (data.result[0].goals > 0) {
				setIsLeagueStarted(true);
				setLeagueResult(data.result);
				setChampionData(prevState => ({
					...prevState,
					...data.championData,
				}));
			}
		} catch (e) {
			if (e?.response && e.response?.data?.message) {
				setMessage({ msgError: e?.response?.data?.message });
			} else {
				setMessage({ msgError: e?.data?.message });
			}
		}
	};

	useEffect(() => {
		getResult();
	}, []);

	const onStartSeasonHandler = async e => {
		setIsLoading(true);
		try {
			const { data } = await api.startLeague();
			const { teamRanks, isStarted } = data;
			setIsLeagueStarted(isStarted);
			setLeagueResult(teamRanks);
			const res = await api.startChampionship(teamRanks[0].name, teamRanks[1].name);
			setChampionData(prevState => ({
				...prevState,
				...res.data.championData,
			}));
			setIsLoading(false);
		} catch (e) {
			if (e?.response && e.response?.data?.message) {
				setMessage({ msgError: e.response?.data.message });
			} else {
				setMessage({ msgError: e?.data?.message });
			}
		}
	};
	const onResetHandler = async e => {
		setIsLoading(true);
		try {
			await api.resetLeague();
			setIsLeagueStarted(false);
			setLeagueResult([]);
			setIsLoading(false);
		} catch (e) {
			if (e?.response && e.response?.data?.message) {
				setMessage({ msgError: e?.response?.data.message });
			} else {
				setMessage({ msgError: e?.data?.message });
			}
		}
	};
	return (
		<>
			{isLoading && <Loader />}
			<main>
				<div className="container home__container">
					<div className="start-season" style={{ marginTop: isLeagueStarted && '40px' }}>
						<Button
							className="btn season-btn primary"
							primary
							text={isLeagueStarted ? 'Simulate the season again' : 'Start season'}
							onSubmitHandler={onStartSeasonHandler}
						/>
						{isLeagueStarted && (
							<Button
								className="btn season-btn secondary"
								primary
								text="Reset season"
								onSubmitHandler={onResetHandler}
							/>
						)}
						{!leagueResult.length && (
							<h1>
								Can you predict the winner <span className="question-mark">? </span> 🧐
							</h1>
						)}
						{message?.msgError || message?.msgBody ? <Message message={message} /> : null}
					</div>
					<div className="section-padding">
						<div className="league__container container">
							{isLeagueStarted ? <h3 className="league__status highlight">League Result</h3> : null}
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
					</div>
					<div className="section-padding">
						<div className="championship__container container">
							{!leagueResult.length ? null : (
								<>
									<h3 className="league__status highlight">Championship Result</h3>

									<div className="game__card move-right">
										<div className="game__card__left item">
											<img
												src={championData?.winner?.image}
												alt={championData?.winner?.name}
												className="game__card__img"
											/>
											<p className="game__card__name">{championData?.winner?.name}</p>
										</div>
										<div className="game__card__mid item">
											<p className="game__card__score">{championData?.winner?.finalGoals}</p>
											<p className="game__card__dots">:</p>
											<p className="game__card__score">{championData?.loser?.finalGoals}</p>
										</div>
										<div className="game__card__right item">
											<p className="game__card__name">{championData?.loser?.name}</p>
											<img
												src={championData?.loser?.image}
												alt={championData?.loser?.name}
												className="game__card__img"
											/>
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
