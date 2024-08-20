/**
 * You are given an integer array nums. You are initially positioned at the array's first index,
 * and each element in the array represents your maximum jump length at that position.
 * 
 * Return true if you can reach the last index, or false otherwise.
 * 
 * Example 1:
 * 
 * Input: nums = [2,3,1,1,4]
 * Output: true
 * Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
 * 
 * Example 2:
 * 
 * Input: nums = [3,2,1,0,4]
 * Output: false
 * Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0,
 * which makes it impossible to reach the last index.
 * 
 * Constraints:
 * 
 * 1 <= nums.length <= 104
 * 0 <= nums[i] <= 105
 */
function canJump(nums: number[]): boolean {
	//Analsys:
	//The problem is a classic example of a greedy algorithm. The idea is to start from the end of the array
	//and keep track of the index that can reach the end. If we can reach the end from the current index,
	//we update the end index to the current index. If we can reach the end from the start of the array,
	//the end index will be 0, and we return true. Otherwise, we return false.

	//Complexity:
	//Time: O(n) - we only iterate through the array once
	//Space: O(1) - we only use 1 variable to store the end index

	let end = nums.length - 1;

	for (let i = nums.length - 2; i >= 0; i--) {
		//note: i + nums[i] >= end is the key to the solution, that means from the current position, we can reach the end
		//if we can, move the end to current position, if not, keep going and check the previous position and see if it can reach the end
		if (i + nums[i] >= end) {
			end = i;
		}
	}

	return end === 0;
}