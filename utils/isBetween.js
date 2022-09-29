exports.isBetween = ({ num1, num2, target }) => {
	let min = Math.min(num1, num2);
	let max = Math.max(num1, num2);
	return target >= min && target <= max;
};
