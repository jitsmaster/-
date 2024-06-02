/**
 * Suppose an array of length n sorted in ascending order is rotated between 1 and n times.
 * For example, the array nums = [0,1,2,4,5,6,7] might become:
 * 
 * [4,5,6,7,0,1,2] if it was rotated 4 times.
 * [0,1,2,4,5,6,7] if it was rotated 7 times.
 * 
 * Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array
 * [a[n-1], a[0], a[1], a[2], ..., a[n-2]].
 * 
 * Given the sorted rotated array nums of unique elements, return the minimum element of this array.
 * 
 * You must write an algorithm that runs in O(log n) time.
 */
function findMin(nums: number[]): number {
	//this is a spin of binary search, since the array is rotated
	//it's much easier to find the index in the rotated array

	//Analysis:
	//since the array is rotated, we can't just do a binary search
	//we need to check which half is sorted
	//for unsorted right half, the mid value will be greater than the right value
	//so we move the left pointer to mid + 1
	//for unsorted left half, the mid value will be less than the left value
	//so we move the right pointer to mid
	//the whole idea is to find the pivot point where the array is rotated

	//Complexity:
	//Time: O(log(n)) - binary search on the rotated array
	//Space: O(1) - constant space with a few variables

	let left = 0;
	let right = nums.length - 1;

	while (left < right) {
		const mid = Math.floor((right - left) / 2) + left; //don't use the  >> 1 trick here, since number could be quite big and endup being negative when right shift

		if (nums[mid] < nums[right]) {
			//if the right half is sorted, move the right pointer
			right = mid;
		} else {
			//if the left half is sorted, move the left pointer
			left = mid + 1;
		}
	}
	//the loop will end when left == right
	//which is the pivot point
	//and the minimum value
	return nums[left]; //or nums[right], doesn't matter since they are the same

};