function knapsackTabulation(weights: number[], values: number[], capacity: number): number {
	const n = weights.length;

	// Initialize the dp table, row is the value of item, column is the remaining capacity
	const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(''));

	// Fill the dp table
	for (let i = 1; i <= n; i++) {
		for (let j = 1; j <= capacity; j++) {
			if (weights[i - 1] <= j) {
				dp[i][j] = Math.max(values[i - 1] + dp[i - 1][j - weights[i - 1]], dp[i - 1][j]);
			} else {
				dp[i][j] = dp[i - 1][j];
			}
		}
	}

	return dp[n][capacity];
}


