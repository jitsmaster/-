/**
 * Calculate the length of the longest palindromic subsequence in a string.
 * @param s - The input string.
 * @returns The length of the longest palindromic subsequence.
 */
function longestPalindromeSubseq_Bu(s: string): number {
	//Analysis:
	//Time Complexity: O(n^2) 
	//Space Complexity: O(n) -  instead of using a 2D array, we use two 1D arrays to optimize space complexity.
	//This solution uses dynamic programming to solve the problem.
	//It fills a 2D array dp where dp[i][j] represents the length of the longest palindromic subsequence in the substring s[i...j].
	//The solution iterates through the string in reverse order, building solutions for larger substrings using solutions of smaller substrings.
	//The time complexity is O(n^2) because there are n^2 subproblems and each subproblem takes constant time to solve.
	//The space complexity is also O(n^2) because we use a 2D array to store the solutions to the subproblems.
	//However, we can optimize the space complexity to O(n) by using two 1D arrays instead of a 2D array.
	//This is because at any point, we only need the current row and the previous row of the dp table.
	//We can alternate between the two rows to save space.

    // Get the length of the input string
	const n = s.length;

    // Create a 2D array for dynamic programming
    // We only need two rows to optimize space complexity
    // This is because at any point, we only need the current row and the previous row
	const dp: number[][] = Array.from({ length: 2 }, () => Array(n).fill(0));

    // Dynamic Programming Approach:
    // We'll fill the dp table bottom-up, starting from the smallest subproblems
    // The idea is to build solutions for larger substrings using solutions of smaller substrings
    // Iterate through the string in reverse order
    // This is because we're building solutions from smaller to larger substrings
	for (let left = n - 1; left >= 0; left--) {
        // Base case: palindrome of length 1 is always 1
        // We use i % 2 to alternate between the two rows of our dp table
		dp[left % 2][left] = 1;

        // For each starting position i, we consider all ending positions j
		for (let right = left + 1; right < n; right++) {
			if (s[left] === s[right]) {
                // If characters at i and j match, we can extend the palindrome
                // We add 2 for the matching characters and include the longest palindrome between i+1 and j-1
				dp[left % 2][right] = 2 + dp[(left + 1) % 2][right - 1];
            } else {
                // If characters don't match, we take the maximum of:
                // 1. Longest palindrome excluding the character at left
                // 2. Longest palindrome excluding the character at right
				dp[left % 2][right] = Math.max(dp[(left + 1) % 2][right], dp[left % 2][right - 1]);
			}
		}
	}

    // The result is stored in dp[0][n-1]
    // This represents the longest palindromic subsequence for the entire string
	return dp[0][n - 1];
}