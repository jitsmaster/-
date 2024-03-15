function findSingleNumbers(nums: number[]): number[] {
	// Step 1: Perform bitwise XOR on all elements
	let xorResult = 0;
	for (const num of nums) {
		xorResult ^= num;
	}

	// Step 2: Find the rightmost set bit, using bitwise AND with 2's complement
	const rightmostSetBit = xorResult & -xorResult;

	// Step 3: Divide the array into two groups
	let num1 = 0;
	let num2 = 0;
	for (const num of nums) {
		//if the rightmost bit is set, XOR with first group
		if (num & rightmostSetBit) {
			num1 ^= num;
		} else {
			//otherwise, XOR with second group
			num2 ^= num;
		}
	}

	// Step 4: Return the two single numbers
	return [num1, num2];
}