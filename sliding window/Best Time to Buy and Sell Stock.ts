/**
 * You are given an array prices where prices[i] is the price of a given stock on the ith day.
 * 
 * You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
 * 
 * Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
 */

function maxProfit(prices: number[]): number {
	let maxProfit = 0;
	let min = prices[0];
	let right = 1;

	while (right < prices.length) {
		const pr = prices[right];
		if (pr < min)
			min = pr;

		const profit = pr - min;
		//avoid using Math.max, it's slower
		if (profit > maxProfit)
			maxProfit = profit;

		right++;
	}

	return maxProfit;
};