function binarySearchInRotatedArray(nums: number[], target: number): number {
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
