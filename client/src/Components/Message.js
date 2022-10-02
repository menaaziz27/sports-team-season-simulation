import React from 'react';

const getStyle = props => {
	let baseClass = 'alert ';
	if (props.message.msgError) baseClass = baseClass + 'danger';
	else baseClass = baseClass + 'primary';
	return baseClass + ' text-center';
};

const Message = props => {
	return (
		<div className={getStyle(props)} role="alert">
			{props.message?.msgBody || props.message?.msgError}
		</div>
	);
};

export default Message;
