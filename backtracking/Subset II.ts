/**
 * Given an integer array nums that may contain duplicates, return all possible
 * subsets (the power set).
 *
 * The solution set must not contain duplicate subsets. Return the solution in any order.
 *
 * Example 1:
 *
 * Input: nums = [1,2,2]
 * Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
 *
 * Example 2:
 *
 * Input: nums = [0]
 * Output: [[],[0]]
 *
 * Constraints:
 *
 * 1 <= nums.length <= 10
 * -10 <= nums[i] <= 10
 */

function subsetsWithDup(nums: number[]): number[][] {
	//Complexity:
	//Time: O(n * 2^n), 2^n is standard for backtracking, since what are deciding at any given point is to include or exclude the number, therefore, every number has 2 possibilities
	// also, O(n log n) for sorting the array, and O(n) for cloning the array (spread operator, but they are ignored since they are much smaller than n * 2^n
	//Space: O(2^n), result array is the main space complexity, also O(n) for recursion stack

	const res: number[][] = [];
	backtrack(0, [])
	return res
	function backtrack(startIndex: number, subset: number[]) {
		nums.sort((a, b) => a - b); //sort the number first to keep the same numbers together. We can do this because the question doesn't require specific order
		//backtracking rule 1: clone the permutation, so we don't end up having recursion touch the added result
		res.push([...subset])

		for (let i = startIndex; i < nums.length; i++) {
			if (i > startIndex //start from the 2nd number, this how we compare with the previous number in range
				&& nums[i] === nums[i - 1]) //skip over the same number, since the array was sorted, so same numbers are together
				continue;

			//standard backtrack now
			subset.push(nums[i])
			backtrack(i + 1, subset); //IMPORTANT: recurse on new index in the loop, not the passed in start index, since each round in for loop reduces further range
			subset.pop();
		}
	}
}
