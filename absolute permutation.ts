function absolutePermutation(n: number, k: number): number[] {
	//we have to consider 2 scenarios:
	//1. if k is 0, the permutation is the same as the original sequence
	//2. if n is divisible by 2k, we can create a valid permutation. The permutation is valid if abs(p[i] - i) = k for every i in [1, 2, ..., n]
	//3. if k is not 0 and not divisible by 2k, return -1

	//algorithm for generating smallest permutation:
	//1. get the group number, which is the index divided by k
	//2. if the group number is even, add k. Otherwise, subtract k.
	const result: number[] = [];

	if (k === 0) {
		// If k is 0, the permutation is the same as the original sequence
		for (let i = 1; i <= n; i++) {
			result.push(i);
		}
	} else if (n % (2 * k) === 0) {
		// If n is divisible by 2k, we can create a valid permutation
		// Explanation: The permutation is valid if abs(p[i] - i) = k for every i in [1, 2, ..., n]
		// We can create a valid permutation by swapping the elements in the sequence
		// For example, if n = 8 and k = 2, the valid permutation is [3, 4, 1, 2, 7, 8, 5, 6]		
		for (let i = 1; i <= n; i++) {
			// Calculate the group number
			const group = Math.floor((i - 1) / k);
			// Calculate the new index. If the group number is even, add k. Otherwise, subtract k.
			const newIndex = i + (group % 2 === 0 ? k : -k);
			result.push(newIndex);
		}
	} else {
		// If no valid permutation exists, return [-1]
		result.push(-1);
	}

	return result;
}