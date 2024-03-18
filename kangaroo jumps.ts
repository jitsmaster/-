function kangarooJumps(x1: number, v1: number, x2: number, v2: number): boolean {
	// Complexity:
	// Time: O(1) - the function will run in constant time, no loops of any sort
	// Space: O(1) - the function will use constant space, 2 variables

	//The trick is to see if the difference on distance can be divided by the difference on speed
	//!IMPORTANT: calculation of distance and speed are opposite of each other.

	//Distance  is the difference between the starting points
	//Relative speed is the difference between the speeds
	//Distance and speed differential are the two factors that determine if the kangaroos will meet
	const distance = x2 - x1;
	const relativeSpeed = v1 - v2;

	if (relativeSpeed === 0) { //this condition is very important to avoid division by zero
		if (distance === 0)
			return true; // If both distance and speed differential are 0, the kangaroos will meet
		else
			return false; // If the relative speed is 0, the kangaroos will never meet
	}

	// If the distance is divisible by the relative speed, the kangaroos will meet
	if (distance % relativeSpeed === 0 && distance / relativeSpeed >= 0) {
		return true;
	}

	return false;
}
