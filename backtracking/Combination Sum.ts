/**
 * Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations
 * of candidates where the chosen numbers sum to target. You may return the combinations in any order.
 *
 * The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the
 * frequency of at least one of the chosen numbers is different.
 *
 * The test cases are generated such that the number of unique combinations that sum up to target is less than 150
 * combinations for the given input.
 *
 * Example 1:
 *
 * Input: candidates = [2,3,6,7], target = 7
 * Output: [[2,2,3],[7]]
 * Explanation:
 * 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
 * 7 is a candidate, and 7 = 7.
 * These are the only two combinations.
 *
 * Example 2:
 *
 * Input: candidates = [2,3,5], target = 8
 * Output: [[2,2,2,2],[2,3,3],[3,5]]
 *
 * Example 3:
 *
 * Input: candidates = [2], target = 1
 * Output: []
 *
 * Constraints:
 *
 * 1 <= candidates.length <= 30
 * 2 <= candidates[i] <= 40
 * All elements of candidates are distinct.
 * 1 <= target <= 40
 *
 * @param candidates
 * @param target
 * @returns
 */

export function combinationSum(candidates: number[], target: number): number[][] {
	const res: number[][] = []
	dfsWithBacktrack(target, 0, [])

	return res;

	function dfsWithBacktrack(target: number, index: number, breadCrumb: number[]) {
		//Analysis: this is a backtracking problem, but it's a 2 branch backtracking
		//the first branch is to stick to the current number, index stays the same,
		//and the second branch is to move on to the next number 
		//and recurse on index + 1

		//for first branch, we will repeat the number from last index
		//for the second branch, we will move on to the next number
		//This video is very helpful on explaining this 2 branch backtracking concept:
		//https://youtu.be/GBKI9VSKdGg?t=240

		//either negative, which means the last number was over the needed remainder
		//or index out of range, stop
		if (target < 0 || index >= candidates.length)
			return;

		//when the target is 0, we found a valid combination, no need to continue either
		//NOTE: if we continue, the backtracking of bread crumb will cause the current sequence to be repeated, 
		//since it's still valid
		//push clone of the current path to the result
		if (target === 0) {
			res.push([...breadCrumb])
			return;
		}

		//2 branches backtracking
		const curNum = candidates[index];
		breadCrumb.push(curNum)
		dfsWithBacktrack(target - curNum, index, breadCrumb) //this path stick to the number and allow it to repeat
		breadCrumb.pop()
		dfsWithBacktrack(target, index + 1, breadCrumb) //this path move on from this number and make sure to remain doesn't contain this number, basically the for loop in recursion
	}
};