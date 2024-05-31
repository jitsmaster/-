/**
 * There are n cars going to the same destination along a one-lane road. The destination is target miles away.

You are given two integer array position and speed, both of length n, where position[i] is the position of the ith car
and speed[i] is the speed of the ith car (in miles per hour).

A car can never pass another car ahead of it, but it can catch up to it and drive bumper to bumper at the same speed.
The faster car will slow down to match the slower car's speed. The distance between these two cars is ignored (i.e.,
they are assumed to have the same position).

A car fleet is some non-empty set of cars driving at the same position and same speed. Note that a single car is also
a car fleet.

If a car catches up to a car fleet right at the destination point, it will still be considered as one car fleet.

Return the number of car fleets that will arrive at the destination.
 * @param target 
 * @param position 
 * @param speed 
 * @returns 
 */
function carFleet(target: number, position: number[], speed: number[]): number {
	// Create an array called "lineup" with the same length as the position array, filled with zeros
	const lineup = Array(position.length).fill(0);

	// Use the position as an index to store the speed in the lineup array
	// This way, we have an array sorted by position in decreasing order automatically
	for (let i = 0; i < position.length; i++) {
		lineup[position[i]] = speed[i];
	}

	// Initialize the number of fleets to 0
	let fleets = 0;

	// Initialize the time of the front car to 0
	let carInFrontTime = 0;

	// Iterate through the lineup array from the farthest position to the target
	for (let pos = lineup.length - 1; pos >= 0; pos--) {
		// Check if there is a car at the current position
		if (lineup[pos] > 0) {
			// Calculate the time it takes for the car to reach the target
			const time = (target - pos) / lineup[pos];

			// If the time is less than the time of the front car,
			// it means the car behind will catch up and merge with the car in front
			// Otherwise, it will form a new fleet
			if (time > carInFrontTime) {
				fleets++;
				//set the longer time as new carInFrontTime
				carInFrontTime = time;
			}
		}
	}

	// Return the number of car fleets that will arrive at the destination
	return fleets;
};