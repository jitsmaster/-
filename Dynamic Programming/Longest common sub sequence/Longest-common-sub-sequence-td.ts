function longestCommonSubsequenceTd(text1: string, text2: string): number {
	//Complexity:
	//Time: O(n * m) - we have to go through all characters of both strings
	//Space: O(n * m) - we create a 2D array to store the length of the longest common subsequence
	
	//Standard top-down dynamic programming
	//Create a 2D array to store the length of the longest common subsequence

	const memo: number[][] = [];

	function helper(i: number, j: number): number {
		if (i === 0 || j === 0) {
			return 0;
		}

		if (!memo[i]) {
			memo[i] = [];
		}

		if (memo[i][j] !== undefined) {
			return memo[i][j];
		}

		if (text1[i - 1] === text2[j - 1]) {
			//key logic: same character will cause current
			//longest common subsequence to be 1 plus the lss of both the previous ends
			memo[i][j] = 1 + helper(i - 1, j - 1);
		} else {
			// key logic: not the same, current will be the max of previous end of text1
			// and current end of text 2, or previous end of text2 and
			memo[i][j] = Math.max(helper(i - 1, j), helper(i, j - 1));
		}

		return memo[i][j];
	}

	return helper(text1.length, text2.length);
}