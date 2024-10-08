/**
 * You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].
 * 
 * Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where:
 * 
 * 0 <= j <= nums[i] and
 * i + j < n
 * 
 * Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].
 * 
 * Example 1:
 * 
 * Input: nums = [2,3,1,1,4]
 * Output: 2
 * Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
 * 
 * Example 2:
 * 
 * Input: nums = [2,3,0,1,4]
 * Output: 2
 * 
 * Constraints:
 * 
 * 1 <= nums.length <= 104
 * 0 <= nums[i] <= 1000
 * It's guaranteed that you can reach nums[n - 1].
 */
function jump(nums: number[]): number {
	//Analysis:
	//The problem is a classic example of a greedy algorithm. 
	//The approach is very much like BFS,
	//the first item is the root node,
	//then we get a list of it's children (the range of where it can jump to)
	//then we get the next level of children and so on.
	//the number of levels is the minimum number of jumps to reach the end.
	//The reason it's greedy is that we can dividing the array up for by the farthest we can jump from the current range.

	let minJumps = 0;
	//start range is 0 to 0, inclusive
	let [l, r] = [0, 0];

	while (r < nums.length - 1) {
		//farthest is the farthest we can jump from the current range
		let farthest = 0;

		//iterate through the current range and find the farthest we can jump
		//this is the greedy part
		for (let i = l; i <= r; i++) {
			farthest = Math.max(farthest, i + nums[i]);
		}

		//update the range to the farthest we can jump, for next layer of children
		[l, r] = [r + 1, farthest];
		//each layer is a jump
		minJumps++;
	}

	return minJumps;
}