function getLexicographicallySmallestSequence(arr: number[], k: number): number[] {
	/**
	 * Time Complexity:

		The outer loop iterates n - 1 times, where n is the length of the array arr.
		The inner loop iterates at most k + 1 times.
		Therefore, the overall time complexity is O((n - 1) * (k + 1)).
		Space Complexity:

		The space complexity is O(n) because a copy of the original sequence is created using the spread operator.
	 */

	//flow: 1. make a copy of the original sequence,
	//      2. iterate through the sequence, starting from the first element, and perform at most k swaps
	//      3. find the smallest element in the next k + 1 elements, and swap the current element with the smallest element found, in the entire range from i to minIndex
	//      4. decrement k by the number of swaps performed

	const n = arr.length;
	const sequence = [...arr]; // Create a copy of the original sequence

	//iterate through the sequence, starting from the first element, and perform at most k swaps
	//so k will decrement by the number of swaps performed
	for (let i = 0; i < n - 1 && k > 0; i++) {
		let minIndex = i;

		// Find the smallest element in the next k + 1 elements
		for (let j = i + 1; j < Math.min(i + k + 1, n); j++) {
			if (sequence[j] < sequence[minIndex]) {
				// Update the index of the smallest element found so far
				minIndex = j;
			}
		}

		// Swap the current element with the smallest element found
		// need to swap the elements from i to minIndex, not just the elements at i and minIndex
		for (let j = minIndex; j > i; j--) {
			[sequence[j], sequence[j - 1]] = [sequence[j - 1], sequence[j]]
		}

		k -= minIndex - i; // Decrement k by the number of swaps performed
	}

	return sequence;
}
