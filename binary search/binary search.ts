/**
 * Given an array of integers nums which is sorted in ascending order, and an integer target,
 * write a function to search target in nums. If target exists, then return its index.
 * Otherwise, return -1.
 *
 * You must write an algorithm with O(log n) runtime complexity.
 *
 * @param nums The sorted array of integers
 * @param tgt The target integer to search for
 * @returns The index of the target in the array, or -1 if it doesn't exist
 */
function binarySearch(nums: number[], tgt: number) {
	let l = 0;
	let r = nums.length - 1;

	//unlike 2 pointers, binary search needs to check the equal case
	while (l <= r) {
		const m = (l + r) >> 1; //bitwise right shift to divide by 2 and floor
		if (nums[m] === tgt)
			return m;
		if (tgt > nums[m]) //if target is greater than the middle, search the right half
			l = m + 1;
		else //if target is smaller than the middle, search the left half
			r = m - 1;
	}

	return -1
}