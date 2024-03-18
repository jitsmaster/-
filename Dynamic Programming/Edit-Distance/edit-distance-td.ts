function minDistance(word1: string, word2: string): number {
	// Complexity:
	// Time: O(n * m) - n is the length of word1, m is the length of word2
	// Space: O(n * m) - n is the length of word1, m is the length of word2

	// Create a memoization table to store the calculated distances
	const memo: number[][] = [];

	// Helper function to calculate the edit distance
	function calculateDistanceRecurse(i: number, j: number): number {
		// If either of the words is empty, the distance is the length of the other word
		if (i === 0) return j;
		if (j === 0) return i;

		// If the distance has already been calculated, return it from the memoization table
		if (memo[i] && memo[i][j] !== undefined) {
			return memo[i][j];
		}

		// If the last characters of the words are the same, recurse diagonally, without any operation
		if (word1[i - 1] === word2[j - 1]) {
			return calculateDistanceRecurse(i - 1, j - 1);
		}

		// Calculate the minimum of three operations: insert, delete, or replace
		const insert = calculateDistanceRecurse(i, j - 1) + 1;
		const deleteOp = calculateDistanceRecurse(i - 1, j) + 1;
		const replace = calculateDistanceRecurse(i - 1, j - 1) + 1;

		// Store the calculated distance in the memoization table
		if (!memo[i]) {
			memo[i] = [];
		}
		memo[i][j] = Math.min(insert, deleteOp, replace);

		return memo[i][j];
	}

	// Call the helper function to calculate the edit distance between the two words
	return calculateDistanceRecurse(word1.length, word2.length);
}

// Example usage
const word1 = "kitten";
const word2 = "sitting";
const distance = editDistance(word1, word2);
console.log(`The edit distance between ${word1} and ${word2} is ${distance}.`);