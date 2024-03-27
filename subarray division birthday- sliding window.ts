/**
 * Subarray Division Birthday problem from 
 * https://www.hackerrank.com/challenges/the-birthday-bar/problem?utm_campaign=challenge-recommendation&utm_medium=email&utm_source=24-hour-campaign
 * @param s : array of integers, the numbers on each of the squares of chocolate
 * @param d : integer, Ron's birth day
 * @param m : integer, Ron's birth month
 * @returns 
 */
function birthday(s: number[], d: number, m: number): number {
	//analysis:
	//This sounds like a backtracking problem, but the since the sub division size is fixed, and the sub divisions must be contiguous,
	//we can use a sliding window approach

	//Complexity Analysis:
	//Time complexity: O(n * m) - we have 2 loops, one for the sliding window and one for the summing up the window
	//Space complexity: O(1) - constant space for the count, and sum within the top loop
	let count = 0;

	//move sliding window from beginning to end
	for (let i = 0; i <= s.length - m; i++) {
		let sum = 0;

		//the sliding window is always size of m
		for (let j = i; j < i + m; j++) {
			//we sum up the window's coverages
			sum += s[j];
		}

		//if sum is equal to d, we increment the count
		if (sum === d) {
			count++;
		}
	}

	return count;
}