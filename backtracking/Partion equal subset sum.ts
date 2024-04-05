function canPartitionBacktrack(nums: number[]): boolean {
	//backtracking
	//the problem is to find if we can partition the array into two subsets with equal sum
	//this is similar to the 0/1 knapsack problem
	//we can use backtracking to solve this problem
	//the time complexity of this problem is O(2^n)
	//the space complexity of this problem is O(n)

	//we can solve this problem using the following steps:
	//1. calculate the sum of all the elements in the array
	//2. if the sum is odd, then we cannot partition the array into two subsets with equal sum
	//3. if the sum is even, then we can partition the array into two subsets with equal sum
	//4. we can use backtracking to find the two subsets with equal sum
	//5. we can start by finding the first subset with sum equal to sum/2
	//6. then we can find the second subset with sum equal to sum/2
	//7. if we can find both the subsets, then we can return true

	const totalSum = nums.reduce((acc, curr) => acc + curr, 0);
	if (totalSum % 2 !== 0) {
		return false;
	}

	const targetSum = totalSum / 2;
	let result = false;

	function backtrack(start: number, currentSum: number) {
		if (currentSum === targetSum) {
			result = true;
			return;
		}

		for (let i = start; i < nums.length; i++) {
			if (currentSum + nums[i] <= targetSum) {
				//step 1: add the number to current sum
				currentSum += nums[i];
				//step 2: backtrack, for next position
				backtrack(i + 1, currentSum);
				//step 3: remove the number from current sum, this line is reached when step 2 of recursive backtracking didn't produce result
				currentSum -= nums[i];
			}
		}
	}

	backtrack(0, 0);
	return result;
};

