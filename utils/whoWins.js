var randomFromRange = function (min, max, priority, chance) {
	var val = null; //initialize value to return

	for (var i = 0; i < priority.length; i++) {
		//loop through priority numbers

		var roll = Math.floor(Math.random() * 100); //roll the dice (outputs 0-100)

		if (chance > roll) {
			///check if the chance is greater than the roll output, if true, there's a hit. Less chance value means less likely that the chance value is greater than the roll output
			val = priority[i]; //make the current number in the priority loop the value to return;
			break; //if there's a hit, stop the loop.
		} else {
			continue; //else, keep looping through the priority list
		}
	}

	//if there is no hit to any priority numbers, return a number from the min and max range
	if (val == null) {
		val = Math.floor(Math.random() * (max - min + 1) + min);
	}

	//return the value and do whatever you want with it
	return val;
};

module.exports = { randomFromRange };
