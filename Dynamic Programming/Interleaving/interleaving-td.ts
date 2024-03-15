function isInterleaved(str1: string, str2: string, target: string): boolean {
	// Create a memoization table to store the results of subproblems
	const memo: boolean[][] = [];

	// Recursive helper function with memoization
	function isInterleavedRecurse(i: number, j: number, k: number): boolean {
		// Base case: If all strings are empty, it's an interleaving
		if (i === 0 && j === 0 && k === 0) {
			return true;
		}

		// If the result is already computed, return it from the memo table
		if (memo[i]?.[j] !== undefined) {
			return memo[i][j];
		}

		// Check if the current characters of str1 and target match
		const isStr1Match = i > 0 && str1[i - 1] === target[k - 1];

		// Check if the current characters of str2 and target match
		const isStr2Match = j > 0 && str2[j - 1] === target[k - 1];

		// If either str1 or str2 matches the current character of target,
		// recursively check the remaining characters
		if ((isStr1Match && isInterleavedRecurse(i - 1, j, k - 1)) ||
			(isStr2Match && isInterleavedRecurse(i, j - 1, k - 1))) {
			// Store the result in the memo table
			memo[i] = memo[i] || [];
			memo[i][j] = true;
			return true;
		}

		// Store the result in the memo table
		memo[i] = memo[i] || [];
		memo[i][j] = false;
		return false;
	}

	// Call the helper function with the lengths of str1, str2, and target
	return isInterleavedRecurse(str1.length, str2.length, target.length);
}