function lengthOfLISTd(nums: number[]): number {
	// Create a memoization table to store the results of subproblems
	const memo: number[][] = [];

	// Recursive helper function with memoization
	function lengthOfLISRecurse(prevIndex: number, currIndex: number): number {
		// Base case: If we reach the end of the array, return 0
		if (currIndex === nums.length) {
			return 0;
		}

		// If the result is already computed, return it from the memo table
		if (memo[prevIndex]?.[currIndex] !== undefined) {
			return memo[prevIndex][currIndex];
		}

		// Include the current element if it's greater than the previous element
		let include = 0;
		if (prevIndex === -1 || nums[currIndex] > nums[prevIndex]) {
			include = 1 + lengthOfLISRecurse(currIndex, currIndex + 1);
		}

		// Exclude the current element
		const exclude = lengthOfLISRecurse(prevIndex, currIndex + 1);

		// Store the result in the memo table
		memo[prevIndex] = memo[prevIndex] || [];
		memo[prevIndex][currIndex] = Math.max(include, exclude);
		return memo[prevIndex][currIndex];
	}

	// Call the helper function with the previous index and the current index
	return lengthOfLISRecurse(-1, 0);
};