function isInterleave(s1: string, s2: string, s3: string): boolean {

	// Create a 2D table to store the results of subproblems
	const dp: boolean[][] = [];

	// Initialize the table with false values
	for (let i = 0; i <= s1.length; i++) {
		dp[i] = new Array(s2.length + 1).fill(false);
	}

	// If the lengths of str1 and str2 don't add up to the length of target,
	// then target can't be an interleaving of str1 and str2
	if (s1.length + s2.length !== s3.length) {
		return false;
	}

	dp[0][0] = true;

	// Fill the first column of dp using s1 and s3
	for (let i = 1; i <= s1.length; i++) {
		dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1];
	}

	// Fill the first row of dp using s2 and s3
	for (let j = 1; j <= s2.length; j++) {
		dp[0][j] = dp[0][j - 1] && s2[j - 1] === s3[j - 1];
	}

	// Process all characters of str1 and str2
	for (let i = 1; i <= s1.length; i++) {

		for (let j = 1; j <= s2.length; j++) {

			const targetChr = s3[i + j - 1];
			const chr1 = s1[i - 1];
			const chr2 = s2[j - 1];

			// If the current character of str1 matches the current character of target or the current character of str2 matches the current character of target,
			dp[i][j] = dp[i - 1][j] && chr1 === targetChr
				|| dp[i][j - 1] && chr2 === targetChr;
		}
	}

	// The last cell of the table will contain the result
	return dp[s1.length][s2.length];
};