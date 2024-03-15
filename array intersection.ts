function intersection(nums1: number[], nums2: number[]): number[] {
	/**
	 * Given two integer arrays nums1 and nums2,
	 *  return an array of their intersection. 
	 * Each element in the result must be unique 
	 * and you may return the result in any order.
	 */

	//note: fancy description, but all it does is to find numbers that show up in both arrays
	//we can turn either of the array into a set, and then check if the other array has the number

	//Complexity Analysis:
	//Time complexity: O(n + m * m) - we iterate through both arrays once, including the set building, and go through the smaller set again
	//Space complexity: O(n) - we store the numbers from both arrays in the sets, could potentially be full size of the smaller array

	const smallSet = nums1.length <= nums2.length ? new Set(nums1) : new Set(nums2);
	const largeSet = nums1.length > nums2.length ? new Set(nums1) : new Set(nums2);
	const intersectionArr: number[] = [];

	for (const num of smallSet) {
		if (largeSet.has(num))
			intersectionArr.push(num)
	}

	return intersectionArr;
};