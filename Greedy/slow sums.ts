function getTotalTime(arr: number[]) {
	// Time Complexity: O(n * logn)
	// Space Complexity: O(1)

	//flow: 1. sort the array in descending order, greedy approach
	//      2. iterate through the array, and calculate the penalty for each element, and add it to the previous penalty
	//      3. return the penalty at first position of the result array
	arr.sort((a, b) => b - a);
	return arr
		.reduce((acc, cur, i) => {
			//acc[0] is the previous penalty, current penalty is acc[1] plus current number
			const previousPenalty = acc[0];
			const penalty = acc[1] + cur;

			//calculate the total penalty and the current penalty
			const penalties = [i === 0 ? 0 : previousPenalty + penalty, penalty]

			// console.info(`total penalty: ${penalties[0]}, current penalty: ${penalties[1]}`)

			return penalties;

		}, [0, 0])[0]
}