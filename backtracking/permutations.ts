/**
 * Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.
 *
 * Example 1:
 * Input: nums = [1,2,3]
 * Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 *
 * Example 2:
 * Input: nums = [0,1]
 * Output: [[0,1],[1,0]]
 *
 * Example 3:
 * Input: nums = [1]
 * Output: [[1]]
 *
 * Constraints:
 * 1 <= nums.length <= 6
 * -10 <= nums[i] <= 10
 * All the integers of nums are unique.
 *
 * @param nums - The array of distinct integers
 * @returns - All possible permutations of the array
 */
function permute(nums: number[]): number[][] {
	//Complexity: 
	//Time: O(n!), since we have n! permutations
	//Space: O(n), recursion stack, and the result array

	const result: number[][] = [];

	function recurseWithBacktrack(remainingOptions: number[], permutation: number[]): void {
		//break out condition, length of permutation is the same as the length of the input numbers
		//means all numbers are being used
		if (permutation.length === nums.length) {
			result.push([...permutation]);
			return;
		}

		for (let i = 0; i < remainingOptions.length; i++) {
			//step 1 push the current option to the permutation
			permutation.push(remainingOptions[i]);
			//step 2 recurse with the remaining options, except the current option
			recurseWithBacktrack(remainingOptions
				.filter((_, idx) => idx !== i), permutation);
			//step 3 undo the step 1, by popping the last element from the permutation
			//if this step is reached, means previous recursion all failed, so we need to backtrack
			permutation.pop();
		}
	}

	recurseWithBacktrack(nums, []);

	return result;
}

function permuteString(str: string): string[] {
	//backtracking
	const result: string[] = [];

	function recurseWithBacktrack(remains: string, permutation: string): void {
		if (permutation.length === str.length) {
			result.push(permutation);
			return;
		}

		for (let i = 0; i < remains.length; i++) {
			//step 1, add the first character of remains to the permutation
			permutation += remains[i];
			//step 2, recurse with the remaining characters of remains
			recurseWithBacktrack(remains.slice(0, i) + remains.slice(i + 1), permutation);
			//step 3, undo step 1, by removing the last character from the permutation
			permutation = permutation.slice(0, permutation.length - 1);
		}
	}

	recurseWithBacktrack(str, '');

	return result;
}
