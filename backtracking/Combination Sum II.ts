/**
 * Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations
 * in candidates where the candidate numbers sum to target.
 *
 * Each number in candidates may only be used once in the combination.
 *
 * Note: The solution set must not contain duplicate combinations.
 *
 * Example 1:
 *
 * Input: candidates = [10,1,2,7,6,1,5], target = 8
 * Output:
 * [
 *   [1,1,6],
 *   [1,2,5],
 *   [1,7],
 *   [2,6]
 * ]
 *
 * Example 2:
 *
 * Input: candidates = [2,5,2,1,2], target = 5
 * Output:
 * [
 *   [1,2,2],
 *   [5]
 * ]
 *
 * Constraints:
 *
 * 1 <= candidates.length <= 100
 * 1 <= candidates[i] <= 50
 * 1 <= target <= 30
 */
function combinationSum2(candidates: number[], target: number): number[][] {
	//when dupes in candidates, sort first
	candidates.sort((a, b) => a - b);
	const res: number[][] = [];
	backtrack(0, [], target);
	return res;

	function backtrack(startIndex: number, combination: number[], remainSum: number) {
		if (remainSum === 0) {
			//IMPORTANT: clone to avoid all empty returns
			res.push([...combination]);
			return;
		}

		if (remainSum < 0) {
			return;
		}

		for (let i = startIndex; i < candidates.length; i++) {
			//skip the dupes
			//note: very important to start from the 2nd item in the current range, not from 0
			//otherwise we will be missing all subsets will dupe numbers inside.
			//Our goal is to avoid dupe subsets with same number, not dupe numbers in the same subset
			if (i > startIndex && candidates[i] === candidates[i - 1]) continue;
			//step 1: push into subset
			combination.push(candidates[i]);
			//step 2: recurse will forward pointer, and reduced target sum
			backtrack(i + 1, combination, remainSum - candidates[i]);
			combination.pop();
		}
	}
}