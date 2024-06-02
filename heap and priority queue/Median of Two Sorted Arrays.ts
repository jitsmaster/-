/**
 * Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
 * The overall run time complexity should be O(log (m+n)).
 * @param nums1 
 * @param nums2 
 * @returns 
 */
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
	//Analysis:
	//log (m+n) is a hint that we need to do binary search
	//the idea is to find the median of the combined array, without actually combining them


	//different approach here : the idea is to do binary search on the smaller array
	//this is because the median is always in the middle of the combined array

	//this is a really good video explaining the concept: https://youtu.be/lLFDQCDzfpI

	const l1 = nums1.length;
	const l2 = nums2.length;

	//we only need to do binary search on the smaller array, if the first array is bigger, we swap them
	//instead of doing variation swapping, just call the function again with reversed arguments
	if (l1 > l2)
		return findMedianSortedArrays(nums2, nums1);


	const totalL = l1 + l2;
	const half = (totalL + 1) >> 1;
	//reason why we add 1 is because if the total length is odd, we want to get the bigger half
	//plus will make sure the left side is bigger:
	//e.g. 12345, we want to get 123, not 12, so half length will be (5 + 1) / 2 = 3.

	let left = 0, right = l1;

	while (left <= right) {
		//we need to meet 2 conditions on getting the correct median
		//1. The last element of the left half of array 1 is less than the first element of the right half of array 2
		//2. The last element of the left half of array 2 is less than the first element of the right half of array 1
		//we can only be sure if the number is indeed median of combined array if these 2 conditions are met

		const mid1 = (left + right) >> 1;
		const mid2 = half - mid1;

		const left1 = max(nums1, mid1);
		const right1 = min(nums1, mid1);

		const left2 = max(nums2, mid2);
		const right2 = min(nums2, mid2);


		if (left1 <= right2 && left2 <= right1) {
			//we found the correct median
			//if even, return the average of the 2, otherwise, return the bigger one
			if (totalL % 2 === 0) {
				//formula is max of left side plus min of right side divided by 2
				//max left take the bigger number of the 2 left sides
				//min right take the smaller number of the 2 right sides
				return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
			}
			else {
				//return the bigger number of the 2 left sides, if odd, since left half is always the bigger half,
				//so we know the max of last items of both arrays will be the median
				return Math.max(left1, left2);
			}
		}

		//if the left half of array 1 is too big, we need to move the right pointer to the left
		if (left1 > right2)
			right = mid1 - 1;
		else //otherwise, move the left pointer to the right
			left = mid1 + 1;

	}

	return -1;

	function max(nums: number[], i: number) {
		//if the i is 0, we return the smallest number possible,
		//since we cannot move anymore left;
		return i === 0 ? Number.MIN_SAFE_INTEGER : nums[i - 1];
	}

	function min(nums: number[], i: number) {
		//if the i is the length of the array, we return the biggest number possible,
		//since we cannot move anymore right;
		//reason we are comparing with length instead of length -1, is because the half is (l +1) / 2, we will are likely to be one number over
		return i === nums.length ? Number.MAX_SAFE_INTEGER : nums[i];
	}
}