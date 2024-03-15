/**
 * Calculates the total number of users based on the growth rates and number of days.
 * @param growthRates An array of growth rates.
 * @param days The number of days.
 * @returns The total number of users.
 */
function getTotalUsers(growthRates: number[], days: number): number {
	let totalUsers = 0;
	for (const growthRate of growthRates) {
		totalUsers += growthRate ** days;
	}
	return totalUsers;
}

/**
 * Finds the day when the total number of users reaches one billion.
 * @param growthRates An array of growth rates.
 * @returns The day when the total number of users reaches one billion.
 */
function getBillionUsersDay(growthRates: number[]): number {
	// Binary search to find the day when the total number of users reaches one billion.
	// The left bound is set to 0, and the right bound is set to an upper limit (e.g., 1000000).
	// The upper limit can be adjusted based on the problem constraints.
	// The goal is to find the smallest day when the total number of users exceeds one billion.
	// If the total number of users is less than one billion, move the left bound to mid + 1.
	// If the total number of users is greater than or equal to one billion, move the right bound to mid - 1.
	// The loop continues until the left bound is greater than the right bound.
	// At that point, the left bound represents the smallest day when the total number of users exceeds one billion.

	// Complexity Analysis:
	// - The getTotalUsers function has a time complexity of O(n), where n is the length of the growthRates array.
	//   This is because it iterates over the growthRates array once to calculate the total number of users.
	// - The getBillionUsersDay function uses binary search to find the day when the total number of users reaches one billion.
	//   The time complexity of binary search is O(log n), where n is the number of possible days.
	//   In this case, the upper bound is set to 1000000, so the time complexity is O(log 1000000) = O(log 10^6) = O(20).
	//   Therefore, the overall time complexity of the getBillionUsersDay function is O(n log n), where n is the length of the growthRates array.


	let left = 0;
	let right = 1000000; // Adjust the upper bound as needed

	while (left <= right) {
		//binary search starts here
		//find the middle point
		const mid = Math.floor((left + right) / 2);
		const totalUsers = getTotalUsers(growthRates, mid);

		if (totalUsers < 10 ** 9) {
			//if the total users is less than 1 billion, move the left bound to mid + 1
			left = mid + 1;
		} else {
			//if the total users is greater than or equal to 1 billion, move the right bound to mid - 1
			right = mid - 1;
		}
	}

	return left;
}

