/**
 * Given an integer array nums of unique elements, return all possible subsets (the power set).
 * The solution set must not contain duplicate subsets. Return the solution in any order.
 *
 * Example 1:
 * Input: nums = [1,2,3]
 * Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 *
 * Example 2:
 * Input: nums = [0]
 * Output: [[],[0]]
 *
 * Constraints:
 * 1 <= nums.length <= 10
 * -10 <= nums[i] <= 10
 * All the numbers of nums are unique.
 *
 * @param nums
 * @returns
 */

function subsetsWithBacktrack(nums: number[]): number[][] {
	const result: number[][] = [];
	function backtrack(current: number[], start: number): void {
		//push the current subset to the result
		//note: this is exhaustive permutation, no condition to break out here
		result.push([...current]); //note that we cloned the array here, since we are going to modify the current array later

		//going through the rest of the numbers
		//start from the current starting index
		//the range from start to length is basically the break out condition
		//preventing stackoverflow
		for (let i = start; i < nums.length; i++) {
			//step1: add the number to the current subset
			current.push(nums[i]);
			//step2: continue to the next number
			backtrack(current, i + 1);
			//step3: remove the number from the current subset, backtrack to bypass the current number, and try the next number
			current.pop();
		}
	}

	backtrack([], 0);
	return result;
};