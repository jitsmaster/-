function subsetsWithBacktrack(nums: number[]): number[][] {
	const result: number[][] = [];
	function backtrack(current: number[], start: number): void {
		//push the current subset to the result
		result.push([...current]);

		for (let i = start; i < nums.length; i++) {
			//step1: add the number to the current subset
			current.push(nums[i]);
			//step2: continue to the next number
			backtrack(current, i + 1);
			//step3: remove the number from the current subset, backtrack when recursion failed
			current.pop();
		}
	}

	backtrack([], 0);
	return result;
};