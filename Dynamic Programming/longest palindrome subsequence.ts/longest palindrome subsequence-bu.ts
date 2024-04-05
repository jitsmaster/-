/**
 * Calculate the length of the longest palindromic subsequence in a string.
 * @param s - The input string.
 * @returns The length of the longest palindromic subsequence.
 */
function longestPalindromeSubseq_Bu(s: string): number {
	const n = s.length;

	// Create two rows for the DP table, which will be used to store the
	// lengths of the longest palindromic subsequences for substrings.
	// We only need two rows to optimize space complexity.
	const dp: number[][] = Array.from({ length: 2 }, () => Array(n).fill(0));

	// Iterate through the string in reverse order.
	for (let i = n - 1; i >= 0; i--) {
		// Set the length of palindromic subsequences of single characters to 1.
		dp[i % 2][i] = 1;

		// Iterate through the remaining characters in the substring.
		for (let j = i + 1; j < n; j++) {
			// If the current characters are the same, increment the length of
			// the palindromic subsequence by 2 and add the previously found
			// longest palindromic subsequence for the inner substring.
			if (s[i] === s[j]) {
				dp[i % 2][j] = 2 + dp[(i + 1) % 2][j - 1];
			}
			// Otherwise, take the maximum length of the subsequences without
			// the current characters.
			else {
				dp[i % 2][j] = Math.max(dp[(i + 1) % 2][j], dp[i % 2][j - 1]);
			}
		}
	}

	// Return the length of the longest palindromic subsequence for the entire string.
	// unlike most dp result, the result is stored in the first row, last column
	return dp[0][n - 1];
}