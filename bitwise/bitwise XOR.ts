function findSingleNumber(nums: number[]): number {
	let result = 0;
	for (let num of nums) {
		result ^= num;
	}
	return result;
}
