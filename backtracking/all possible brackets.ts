function printBracesCombinations(n: number): void {
	const result: string[][] = [];
	const stack: string[] = [];

	//standard backtrack approach
	//difference is: we have to keep track of the number of open and close brackets
	//if open < n, then we can add an open bracket
	//if close < open, then we can add a close bracket
	//so 2 recursive calls, one for open and one for close
	//Complexity:
	//Time: O(2^n) where n is the number of brackets
	//Space: O(2^n) where n is the number of brackets

	function generateCombinations(open: number, close: number): void {
		if (open === n && close === n) {
			result.push([...stack]);
			//really important, must create a copy of the original stack,
			//otherwise, we will be directly manipulating the array pushed in the result
			//in later iterations. This is a common mistake in backtracking problems
			return;
		}

		//if open < n, then we can add an open bracket
		if (open < n) {
			stack.push("{");
			generateCombinations(open + 1, close);
			//backtrack in case we need to try the other option
			stack.pop();
		}

		//if close is less than open, then we can add a close bracket
		if (close < open) {
			stack.push("}");
			//backtrack in case we need to try the other option
			generateCombinations(open, close + 1);
			stack.pop();
		}
	}

	generateCombinations(0, 0);

}
