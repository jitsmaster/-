function longestCommonSubsequenceBu(text1: string, text2: string): number {
	const memo = Array.from({ length: text1.length + 1 }, () => Array(text2.length + 1).fill(0));
	let max = 0;

	for (let i = 1; i <= text1.length; i++) {
		for (let j = 1; j <= text2.length; j++) {
			if (text1[i - 1] === text2[j - 1]) {
				memo[i][j] = 1 + memo[i - 1][j - 1];
			} else {
				memo[i][j] = Math.max(memo[i - 1][j], memo[i][j - 1]);
			}

			max = Math.max(max, memo[i][j]);
		}
	}

	return max;
};