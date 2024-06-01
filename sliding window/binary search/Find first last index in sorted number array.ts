//Find index, always binary search

function findFirstLastIndex(nums: number[], target: number): [number, number] {
	let firstIndex = findIndex(nums, target, false);
	let lastIndex = findIndex(nums, target, true);

	return [firstIndex, lastIndex];
}


function findIndex(nums: number[], target: number, isLast: boolean) {
	let firstIndex = -1;
	let left = 0;
	let right = nums.length - 1;
	while (left <= right) {
		//divid by 2 to get the middle index (floor it to get the lower index if the length is odd)
		const mid = Math.floor((left + right) / 2);
		if (nums[mid] === target) {
			//match found, move the right to left, to keep on looking for smaller index
			firstIndex = mid;
			if (!isLast)
				right = mid - 1;
			else
				left = mid + 1;
		} else if (nums[mid] < target) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}
	return firstIndex
}

