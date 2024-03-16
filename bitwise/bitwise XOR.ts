function findSingleNumber(nums: number[]): number {
	//number bitwise XOR itself is always 0
	//so we can use the XOR operator to find the single number
	let result = 0;
	for (let num of nums) {
		//XOR all the numbers
		result ^= num;
	}
	return result;
}
