function moveZerosToLeft(nums: number[]): void {
	let nonZeroIndex = nums.length - 1;

	//move all numbers to the right that are not zero
	for (let i = nums.length - 1; i >= 0; i--) {
		if (nums[i] !== 0) {
			nums[nonZeroIndex] = nums[i];
			nonZeroIndex--;
		}
	}

	//fill up the rest with zeros
	while (nonZeroIndex >= 0) {
		nums[nonZeroIndex] = 0;
		nonZeroIndex--;
	}
}

