import React from 'react';

const Button = ({ text, className, onSubmitHandler }) => {
	return (
		<button className={className} onClick={onSubmitHandler}>
			{text}
		</button>
	);
};

export default Button;
