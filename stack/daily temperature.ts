function dailyTemperatures(temperatures: number[]): number[] {
	//This is a monotonic stack problem
	//The stack will be stricting decreasing or equal
	//When increase is found, we will pop the stack until the stack is empty or the top of the stack is no less than the current element.
	//For popped elements, we will calculate the difference between the current index and the index of the popped element.
	//Store the diff in the original location of the popped element.

	//Complexity:
	//Time complexity: O(n^2) - nested loop of temperatures iteration, and inner while loop for stack, which could potentially iterate through all elements
	//Space complexity: O(n) - stack and diffs array

	const stack: { val: number, idx: number }[] = [];
	//pre-fill the diffs array with 0, since we will need to update diff from original index
	const diffs: number[] = Array(temperatures.length).fill(0);

	//push the first element into the stack
	stack.push({ val: temperatures[0], idx: 0 });

	for (let i = 1; i < temperatures.length; i++) {
		const cur = temperatures[i];
		//monotonic stack, so we will pop until the stack is empty or the top of the stack is no less than the current element
		while (stack.length > 0
			&& stack[stack.length - 1].val < cur) {
			//pop the stack, which will be the last element (smallest element)
			const prev = stack.pop()!;
			//the difference between the current index and the index of the popped element
			const idxDiff = i - prev.idx;
			//store the diff in the original location of the popped element
			diffs[prev.idx] = idxDiff;
		}

		//important: make sure to push the current element into the stack
		stack.push({ val: cur, idx: i })
	}

	return diffs;
};