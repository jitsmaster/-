export function findTargetSumWays(nums: number[], target: number): number {
	function knapSack(tgtSum: number) {
		const cols = tgtSum + 1;
		const rows = nums.length + 1;

		const dp = Array.from({ length: rows }, () => Array(cols).fill(0));

		for (let row = 0; row < cols; row++) {
			dp[row][0] = 1;
		}

		for (let row = 1; row < rows; row++) {
			for (let col = 1; col < cols; col++) {
				if (nums[row - 1] <= col) {
					dp[row][col] = dp[row - 1][col] + dp[row - 1][col - nums[row - 1]];
				}
				else
					dp[row][col] = dp[row - 1][col];
			}

			console.log(dp[row]);
		}

		return dp[rows - 1][cols - 1];
	}

	const sum = nums.reduce((acc, cur) => {
		return acc + cur;
	}, 0)

	if (nums.length === 1)
		return Math.abs(target) === Math.abs(nums[0]) ? 1 : 0;

	const tgtSum = (target + sum) >> 1; //bitwise to get floor, much faster

	return knapSack(tgtSum);
};

//todo: not   working for current test case yet