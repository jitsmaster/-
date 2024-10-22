/**
 * You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged 
 * in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically 
 * contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

 

Example 1:

Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
Example 2:

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
Example 3:

Input: nums = [1,2,3]
Output: 3
 

Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 1000
 */

function rob(nums: number[]): number {
	//since first and last element are connected,
	//we just need to run rob twice and get max of them
	//first one will be without the start, second one will be without the end

	//Complexity:
	//Time: O(n) - we run rob twice, each iterate through array once (minus 1 element)
	//Space: O(1) - 2 variables for 2 sums, and each run introduce 2 variables
	function robLinear(nums: number[]) {
		//standard rob houses
		let r1=0, r2=0;
		for (const n of nums) {
			[r1, r2] = [r2, Math.max(n + r1, r2)];
		}

		return r2
	}

	const start = nums[0];

	//in place array manipulation to avoid extra space
	//remove first element
	nums.splice(0, 1);
	const sum1 = robLinear(nums);
	nums.splice(nums.length - 1, 1);
	nums.unshift(start);
	const sum2 = robLinear(nums);

	return Math.max(sum1, sum2);
};