/**
 * HackerLand Enterprise is adopting a new viral advertising strategy. When they launch a new product,
 * they advertise it to exactly people on social media.
 *
 * On the first day, half of those people (i.e., ) like the advertisement and each shares it with of their friends.
 * At the beginning of the second day, people receive the advertisement.
 *
 * Each day, of the recipients like the advertisement and will share it with friends on the following day.
 * Assuming nobody receives the advertisement twice, determine how many people have liked the ad by the end of a given day,
 * beginning with launch day as day .
 * 
 * Example: n = 5
 * Day Shared Liked Cumulative
 * 1      5     2       2
 * 2      6     3       5
 * 3      9     4       9
 * 4     12     6      15
 * 5     18     9      24
 * 
 * @param n
 * @returns
 */
function viralAdvertising(n: number) {
	//dp approach
	//Array of dp, each element is an array of 2 elements
	//first element is the additional number of people who liked the ad, 
	//second element is the cumulative number of people who liked the ad

	//Complexity Analysis:
	//Time complexity is O(n) - loop through n
	//Space complexity is O(n) - dp array of size n

	//Note: we don't really need DP for it, just 2 numbers, 1 for the current day, 1 for the cumulative
	//This is just an exercise to show how DP can be used

	const dp = Array(n).fill([0, 0]);
	const base = Math.floor(5 / 2);
	dp[0] = [base, base];
	console.log(`i: 0; [${dp[0].join(",")}]`)

	for (let i = 1; i < n; i++) {
		//each day, the number of people who liked the ad is the number of people who shared the ad
		//times 3/2, and the cumulative number of people who liked the ad is the previous cumulative
		const newLikes = Math.floor(dp[i - 1][0] * 3 / 2);
		dp[i] = [newLikes, dp[i - 1][1] + newLikes];
		console.log(`i: ${i}; [${dp[i].join(",")}]`)
	}

	//last item's second number in the dp array is the result
	return dp[n - 1][1];
}