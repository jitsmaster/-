// Function to calculate the minimum number of operations
function minOperationsToMakePermutationAscending(n: number, permutation: number[]): number {
	//Time Complexity: O(n^2) - iterate through the permutation and reverse the sub-portion of the permutation
	//Space Complexity: O(1) - no extra space used

	//flow: 1. iterate through the permutation,
	//      2. if the current element is not in the correct position, find the index of the element that should be in the current position
	//      3. reverse the sub-portion of the permutation from i to correctIndex, using 2 pointers
	//      4. increment the operations counter

	// Function to reverse a sub-portion of the permutation
	function reverseSubportion(start, end) {
		// Create a copy of the sub-portion to be reversed
		const subportion = permutation.slice(start, end + 1);

		//use 2 pointers to reverse the sub-portion
		let left = start;
		let right = end;
		while (left < right) {
			[permutation[left], permutation[right]] = [permutation[right], permutation[left]];
			left++;
			right--;
		}
	}

	// Initialize a counter to keep track of the number of operations
	let operations = 0;

	// Iterate through the permutation
	for (let i = 0; i < n - 1; i++) {
		// If the current element is not in the correct position
		if (permutation[i] !== i + 1) {
			// Find the index of the element that should be in the current position
			const correctIndex = permutation.indexOf(i + 1);

			// Reverse the sub-portion of the permutation from i to correctIndex
			reverseSubportion(i, correctIndex);

			// Increment the operations counter
			operations++;
		}
	}

	// Return the minimum number of operations
	return operations;
}


