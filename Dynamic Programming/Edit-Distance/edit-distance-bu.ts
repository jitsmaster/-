function minDistance(word1: string, word2: string): number {
	//Complexity: 
	//Time: O(n * m) - n is the length of word1, m is the length of word2
	//Space Complexity: O(n * m) - n is the length of word1, m is the length of word2
	//fill up the array with 0s, the length of array is word.length + 1
	const dp = Array.from({ length: word1.length + 1 }, () => Array(word2.length + 1).fill(0));

	for (let i = 0; i <= word1.length; i++) {
		for (let j = 0; j <= word2.length; j++) {
			if (i === 0) {
				dp[i][j] = j;
			} else if (j === 0) {
				dp[i][j] = i;
			} else if (word1[i - 1] === word2[j - 1]) {
				//keep the diagonal value, if the last characters are the same
				//previous row and column means replace
				dp[i][j] = dp[i - 1][j - 1];
			} else {
				//consider the minimum of the three operations
				//insert, delete, replace
				//insert is the value of the previous column
				//delete is the value of the previous row
				//replace is the value of the diagonal
				//has to be minimum of the three operations
				//since we are looking for the minimum number of operations
				const insertN = dp[i][j - 1];
				const deleteN = dp[i - 1][j];
				const replaceN = dp[i - 1][j - 1];
				dp[i][j] = 1 + Math.min(insertN, deleteN, replaceN);
			}
		}
	}

	return dp[word1.length][word2.length];
}