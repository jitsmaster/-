function minDistance(word1: string, word2: string): number {
	//fill up the array with 0s, the length of array is word.length + 1
	const memo = Array.from({ length: word1.length + 1 }, () => Array(word2.length + 1).fill(0));

	for (let i = 0; i <= word1.length; i++) {
		for (let j = 0; j <= word2.length; j++) {
			if (i === 0) {
				memo[i][j] = j;
			} else if (j === 0) {
				memo[i][j] = i;
			} else if (word1[i - 1] === word2[j - 1]) {
				//keep the diagonal value, that last character are the same
				memo[i][j] = memo[i - 1][j - 1];
			} else {
				//consider the minimum of the three operations
				const insertN = memo[i][j - 1];
				const deleteN = memo[i - 1][j];
				const replaceN = memo[i - 1][j - 1];
				memo[i][j] = 1 + Math.min(insertN, deleteN, replaceN);
			}
		}
	}

	return memo[word1.length][word2.length];
}