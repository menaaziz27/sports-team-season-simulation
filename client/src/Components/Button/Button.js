import React from 'react';
import styles from './Button.module.css';

const Button = ({ text, primary, secondary, className }) => {
	return (
		<button className={`${styles.btn} ${primary && styles.primary} ${secondary && styles.secondary} ${className}`}>
			{text}
		</button>
	);
};

export default Button;
