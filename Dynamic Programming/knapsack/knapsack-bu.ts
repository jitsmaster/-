
/**
 * Solves the knapsack problem using tabulation (bottom-up) approach.
 * 
 * @param weights - An array of weights of the items.
 * @param values - An array of values of the items.
 * @param capacity - The maximum capacity of the knapsack.
 * @returns The maximum value that can be obtained by selecting items without exceeding the capacity.
 */
function knapsackTabulation(weights: number[], values: number[], capacity: number): number {
	const weightsLength = weights.length;

	// Initialize the dp table, row is the item index, column is the remaining capacity
	const dp = Array.from({ length: weightsLength + 1 }, () => Array(capacity + 1).fill(0));

	// Fill the dp table
	for (let row = 1; row <= weightsLength; row++) {
		for (let col = 1; col <= capacity; col++) {
			if (weights[row - 1] <= col) {
				dp[row][col] = Math.max(
					//previous items's value, plus the value of the previous item under the remaining capacity (col - weights[row - 1])
					values[row - 1] + dp[row - 1][col - weights[row - 1]],
					dp[row - 1][col]); //previous item's value under current capacity in dp table
			} else {
				//if the weight of the current item is greater than the remaining capacity
				//just copy from previous item, since we can't add the current item due to out of capacity
				dp[row][col] = dp[row - 1][col];
			}
		}
	}

	//the very last cell in the dp table will have the maximum value
	//standard DP approach
	return dp[weightsLength][capacity];
}


