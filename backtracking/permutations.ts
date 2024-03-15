export function permute(nums: number[]): number[][] {
	const result: number[][] = [];

	function backtrack(remainingOptions: number[], permutation: number[]): void {
		if (permutation.length === nums.length) {
			result.push([...permutation]);
			return;
		}

		for (let i = 0; i < remainingOptions.length; i++) {
			if (permutation.includes(remainingOptions[i])) {
				continue;
			}

			//step 1 push the current option to the permutation
			permutation.push(remainingOptions[i]);
			//step 2 recurse with the remaining options, except the current option
			backtrack(remainingOptions
				.filter((_, idx) => idx !== i), permutation);
			//step 3 undo the step 1, by popping the last element from the permutation
			//if this step is reached, means previous recursion all failed, so we need to backtrack
			permutation.pop();
		}
	}

	backtrack(nums, []);

	return result;
}
