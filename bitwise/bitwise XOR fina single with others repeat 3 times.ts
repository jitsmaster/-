function findSingleNumber(nums: number[]): number {
	// Initialize variables to keep track of the counts
	let ones = 0; // Represents the bits that appear once
	let twos = 0; // Represents the bits that appear twice

	for (const num of nums) {
		// Calculate the bits that appear twice
		twos |= (ones & num);

		// Calculate the bits that appear once
		ones ^= num;

		// Calculate the bits that appear three times
		const threes = (ones & twos);

		// Clear the bits that appear three times from ones and twos
		ones &= ~threes;
		twos &= ~threes;
	}

	// At the end, the variable 'ones' will contain the single number
	return ones;
}
