import React from 'react';

const Button = ({ text, className, onStartSeasonHandler }) => {
	return (
		<button className={className} onClick={onStartSeasonHandler}>
			{text}
		</button>
	);
};

export default Button;
