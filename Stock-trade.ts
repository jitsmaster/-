function maxProfit(prices: number[]): number {
	//2 pointers approach
	let maxProfit = 0;
	let low = 0;
	let high = 1;

	//loop till the right pointer to the end of the array
	while (high < prices.length) {
		if (prices[high] > prices[low]) {
			//if right price is greater than left
			//calculate the profit and store the max profit
			const profit = prices[high] - prices[low];
			maxProfit = Math.max(maxProfit, profit);
		} else {
			//otherwise, right become the new low
			low = high;
		}
		high++;
	}

	return maxProfit;
}

function maxProfitTopDown(prices: number[]): number {
	const memo: number[] = new Array(prices.length).fill(-1);
	function maxProfitTopDownRecursive(prices: number[], index: number, memo: number[]): number {
		if (index >= prices.length) {
			return 0;
		}

		if (memo[index] !== -1) {
			return memo[index];
		}

		let maxProfit = 0;
		for (let i = index + 1; i < prices.length; i++) {
			if (prices[i] > prices[index]) {
				const profit = prices[i] - prices[index] + maxProfitTopDownRecursive(prices, i + 1, memo);
				maxProfit = Math.max(maxProfit, profit);
			}
		}

		memo[index] = maxProfit;
		return memo[index];
	}
	return maxProfitTopDownRecursive(prices, 0, memo);
}

function maxProfitBottomUp(prices: number[]): number {
	const dp: number[] = new Array(prices.length + 1).fill(0);
	for (let i = prices.length - 1; i >= 0; i--) {
		let maxProfit = 0;
		for (let j = i + 1; j < prices.length; j++) {
			if (prices[j] > prices[i]) {
				const profit = prices[j] - prices[i] + dp[j + 1];
				maxProfit = Math.max(maxProfit, profit);
			}
		}
		dp[i] = Math.max(maxProfit, dp[i + 1]);
	}
	return dp[0];
}
