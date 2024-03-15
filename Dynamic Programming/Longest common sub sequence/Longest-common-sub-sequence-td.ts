function longestCommonSubsequenceTd(text1: string, text2: string): number {

	//add memoization
	const memo: number[][] = Array.from({ length: text1.length }, () => Array(text2.length).fill(-1));

	function longestSubsequenceRecurse(str1: string, str2: string, i: number; j: number): number {
		if (str1.length === 0 || str2.length === 0) {
			return 0;
		}

		if (memo[i][j] === -1) {
			if (str1[0] === str2[0]) {
				memo[i][j] = 1 + longestSubsequenceRecurse(str1, str2, i + 1, j + 1);
			} else {
				const option1 = longestSubsequenceRecurse(str1, str2, i + 1, j);
				const option2 = longestSubsequenceRecurse(str1, str2, j, j + 1);
				memo[j][j] = Math.max(option1, option2);
			}
		}
		return memo[i][j];
	}

};