function canPartitionTopDown(nums: number[]): boolean {
	// top-down with memoization
	// the problem is to find if we can partition the array into two subsets with equal sum
	// this is similar to the 0/1 knapsack problem
	// we can use top-down with memoization to solve this problem
	// the time complexity of this problem is O(n * sum)
	// the space complexity of this problem is O(n * sum)

	const totalSum = nums.reduce((acc, curr) => acc + curr, 0);
	if (totalSum % 2 !== 0) {
		return false;
	}

	const targetSum = totalSum / 2;
	const memo: boolean[][] = [];

	function solveSubProblem(index: number, currentSum: number): boolean {
		if (currentSum === targetSum) {
			return true;
		}

		if (index >= nums.length || currentSum > targetSum) {
			return false;
		}

		if (memo[index] && memo[index][currentSum] !== undefined) {
			return memo[index][currentSum];
		}

		const include = solveSubProblem(index + 1, currentSum + nums[index]);
		const exclude = solveSubProblem(index + 1, currentSum);

		memo[index] = memo[index] || [];
		memo[index][currentSum] = include || exclude;

		return memo[index][currentSum];
	}

	return solveSubProblem(0, 0);
};

function canPartitionBottomUp(numbers: number[]): boolean {
	// bottom-up with tabulation
	// the problem is to find if we can partition the array into two subsets with equal sum
	// this is similar to the 0/1 knapsack problem
	// we can use bottom-up with tabulation to solve this problem
	// the time complexity of this problem is O(n * sum)
	// the space complexity of this problem is O(n * sum)

	const totalSum = numbers.reduce((acc, curr) => acc + curr, 0);
	if (totalSum % 2 !== 0) {
		return false;
	}

	const targetSum = totalSum / 2;
	//construct the dp table
	//row axis represents the numbers index
	//column axis represents the sum
	const dp: boolean[][] = Array.from({ length: numbers.length + 1 }, () => Array(targetSum + 1).fill(false));

	//first colunm is true, because we can always get 0 sum with no elements
	for (let r = 0; r <= numbers.length; r++) {
		dp[r][0] = true;
	}

	for (let r = 1; r <= numbers.length; r++) {
		for (let c = 1; c <= targetSum; c++) {
			if (c >= numbers[r - 1]) {
				//current sum is greater than or equal to the previous number
				//if result from last row/number is true, then we can include the number
				//otherwise, we check if the remaning sum can be made up by excluding the number
				dp[r][c] = dp[r - 1][c]
					|| dp[r - 1][c - numbers[r - 1]];
			} else {
				//current sum is less then the previous number
				//we can only exclude the number, makes no sense to include the number
				//so the result is same as the previous result
				dp[r][c] = dp[r - 1][c];
			}
		}
	}

	return dp[numbers.length][targetSum];
}