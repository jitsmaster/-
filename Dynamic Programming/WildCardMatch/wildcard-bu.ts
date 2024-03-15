function isMatch(string: string, pattern: string): boolean {
	const stringDim = string.length + 1;
	const patternDim = pattern.length + 1;

	// Create a 2D array to store the results of subproblems
	// dp[i][j] will be true if the first i characters in s and the first j characters in p match
	// we are building a matrix and the last cell will be the result
	// y axis is the string and x axis is the pattern
	const dp: boolean[][] = Array.from({ length: stringDim }, () => Array(patternDim).fill(false));

	// Empty string and empty pattern match
	dp[0][0] = true;

	// Empty pattern matches with all characters of string
	// this is for the case when the pattern is *
	// fill up the first row
	for (let j = 1; j < patternDim; j++) {
		if (pattern[j - 1] === '*') {
			dp[0][j] = dp[0][j - 1];
		}
	}

	// Empty string matches with all characters of pattern
	// this is for the case when the pattern is *
	// fill up the first column
	for (let i = 1; i < stringDim; i++) {
		if (pattern[0] === '*') {
			dp[i][0] = dp[i - 1][0];
		}
	}

	// Fill the rest of the matrix
	// same philosophy as the longest common subsequence
	// we resolve current problem based on the previous ones
	for (let i = 1; i < stringDim; i++) {
		for (let j = 1; j < patternDim; j++) {
			if (pattern[j - 1] === '?' || string[i - 1] === pattern[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1];
			} else if (pattern[j - 1] === '*') {
				dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
			}
		}
	}
	return dp[stringDim][patternDim];
}

