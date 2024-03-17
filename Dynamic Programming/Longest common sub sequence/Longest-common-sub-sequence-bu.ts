//note: this works for both string and array
//same type of sequences
function longestCommonSubsequenceBu(text1: string, text2: string): number {
	//Complexity:
	//Time: O(n * m) - we have to go through all characters of both strings
	//Space: O(n * m) - we create a 2D array to store the length of the longest common subsequence
	
	//Standard bottom-up dynamic programming
	//Create a 2D array to store the length of the longest common subsequence
	//The size of the array is text1.length + 1 x text2.length + 1
	//The extra row and column are for the base case of having an empty sequence
	const dp = Array.from({ length: text1.length + 1 }, () => Array(text2.length + 1).fill(0));
	let max = 0;

	for (let i1 = 1; i1 <= text1.length; i1++) {
		for (let i2 = 1; i2 <= text2.length; i2++) {
			//2 previous characters are the same, so current postion value
			//is 1 plus 1 to the previous longest common subsequence
			if (text1[i1 - 1] === text2[i2 - 1]) {
				//key logic: same character will cause current 
				//longest common subsequence to be 1 plus the lss of both the previous ends
				//from both strings
				dp[i1][i2] = 1 + dp[i1 - 1][i2 - 1];
			} else {
				// key logic: not the same, current will be the max of previous end of text1 
				// and current end of text 2, or previous end of text2 and 
				// current end of text 1
				dp[i1][i2] = Math.max(dp[i1 - 1][i2], dp[i1][i2 - 1]);
			}

			max = Math.max(max, dp[i1][i2]);
		}
	}

	return max;
};