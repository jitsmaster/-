/**
 * Get the length of the longest increasing subsequence in an array, bottom up approach with tabulation
 * @param nums 
 * @returns 
 */
function lengthOfLIS(nums: number[]): number {
	//Complexity:
	//Time: O(n^2) - we are solving subproblems, and there are n^2 subproblems
	//Space: O(n) - dp array
	//create a dp array to store the length of the longest increasing subsequence
	//fill all items with 1 first
	//each item in the dp array represents the length of the longest increasing subsequence
	const dp: number[] = new Array(nums.length).fill(1);

	//i for current number, j for previous number
	for (let i = 1; i < nums.length; i++) {
		for (let j = 0; j < i; j++) {
			//if the current number is greater than the previous number, then we can include the current number
			//in the subsequence, so we take the maximum of the current subsequence length and the previous 
			//subsequence
			if (nums[i] > nums[j]) {
				dp[i] = Math.max(dp[i], dp[j] + 1); 
				// +1 because we are including the current number
				//in the subsequence.
			}
		}
	}

	return Math.max(...dp);
}