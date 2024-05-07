function canPartitionKSubsets(nums: number[], k: number): boolean {
	//Complexity:
	//Time complexity: O(2^n * n) - where n is the length of the input array, 
	//since we are iterating through all possible subsets, and each subset has inner loop to iterate through all numbers
	//Space complexity: O(2^n) - the dynamic programming array has 2^n elements

	// Dynamic programming array to store intermediate results
	// the length of the array is 2^n, where n is the length of the input array
	//Explanation:
	//1 << nums.length is the same as 2^nums.length
	//e.g. 1 << 3 = 2 * 2* 2 = 2^3 = 8

	//The dp array length is 1 << nums.length, which is 2^(nums.length)
	const dp: number[] = new Array(1 << nums.length).fill(-1);

	let sum = nums.reduce((acc, curr) => acc + curr, 0); // Total sum of the array

	if (sum % k !== 0) {
		return false; // If the total sum is not divisible by k, it's not possible to partition the array into k subsets with equal sums
	}

	const target = sum / k; // Calculate the target sum for each subset

	dp[0] = 0; // Base case: an empty subset has a sum of 0
	for (let i = 0; i < dp.length - 1; i++) {
		//outer loop to iterate through all possible subsets
		//the last element of the dp array is the result
		//the dp array is a bitmask, where each bit represents whether the corresponding number is included in the subset

		if (dp[i] === -1) {
			continue; // Skip if the current subset sum is not possible
		}

		const curSum = dp[i]; // Current subset sum is at index i

		nums.forEach((num, j) => {
			//inner loop to iterate through all numbers in the array

			if ((i & (1 << j)) === 0  //this is to check if the number is already included in the subset, which is bitwise AND between i and 2^j
				&& curSum + num <= target) {
				// Check if the candidate number is not already included in the subset and 
				//adding it won't exceed the target sum
				//the target position is i OR 2^j: e.g. 0010 OR 0100 = 0110
				dp[i | (1 << j)] = (curSum + num) % target; // target sum is curSum + num  modulated by target
			}
		});

		if (dp[dp.length - 1] === 0) {
			return true; // If the last element of the dp array is 0, it means all subsets have equal sums
		}
	}
	return false; // If no equal sum subsets are found, return false
}
