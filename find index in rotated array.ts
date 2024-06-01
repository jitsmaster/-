/**
 * You are given an array of length n which was originally sorted in ascending order.
 * It has now been rotated between 1 and n times. For example, the array nums = [1,2,3,4,5,6]
 * might become:
 * [3,4,5,6,1,2] if it was rotated 4 times.
 * [1,2,3,4,5,6] if it was rotated 6 times.
 * Notice that rotating the array 4 times moves the last four elements of the array to the beginning.
 * Rotating the array 6 times produces the original array.
 * Assuming all elements in the rotated sorted array nums are unique,
 * return the minimum element of this array.
 * A solution that runs in O(n) time is trivial, can you write an algorithm that runs in O(log n) time?
 * @param nums 
 * @param target 
 * @returns 
 */
function binarySearchInRotatedArray(nums: number[], target: number): number {
	//spin of binary search
	//in this case, we only want to search in the sorted half
	//so as we divide the array into 2, we need to check which half is sorted
	//and if the target is within that half, move the pointers accordingly
	//if not, move the pointers to the other half
	//a nest binary search of sort

	//Complexity:
	//Time: O(log(n)) - binary search on the rotated array
	//Space: O(1) - constant space with a few variables

	let left = 0;
	let right = nums.length - 1;

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);

		if (nums[mid] === target) {
			return mid;
		}

		// If the left half is sorted
		if (nums[left] <= nums[mid]) {
			// Check if the target is within the left half
			if (nums[left] <= target && target < nums[mid]) {
				//if yes, then move to left half
				right = mid - 1;
			} else {
				left = mid + 1;
			}
		}
		// If the right half is sorted
		else {
			// Check if the target is within the right half
			if (nums[mid] < target && target <= nums[right]) {
				//if yes, then move the right half
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		}
	}

	return -1; // Target not found
}
