
/**
 * Given an array of integers, determine whether the array can be sorted in ascending order using only one of the
 * following operations one time.
 *
 * Swap two elements.
 * Reverse one sub-segment.
 *
 * Determine whether one, both or neither of the operations will complete the task. Output is as follows.
 *
 * If the array is already sorted, output yes on the first line. You do not need to output anything else.
 *
 * If you can sort this array using one single operation (from the two permitted operations) then output yes on the
 * first line and then:
 *
 * If elements can only be swapped, and, output swap l r in the second line. and are the indices of the elements to be
 * swapped, assuming that the array is indexed from to .
 *
 * If elements can only be reversed, for the segment, output reverse l r in the second line. and are the indices of
 * the first and last elements of the subarray to be reversed, assuming that the array is indexed from to . Here
 * represents the subarray that begins at index and ends at index, both inclusive.
 *
 * If an array can be sorted both ways, by using either swap or reverse, choose swap.
 *
 * If the array cannot be sorted either way, output no on the first line.
 *
 * @param arr 
 * @returns 
 */
function almostSorted(arr: number[]): boolean {
	//Complexity Analysis
	//Time complexity: O(n log n) - 2 loops to find start and end, plus sorting the array
	//Space complexity: O(n) - space needed to store the sorted array, swapped array, and reversed array

	const n = arr.length;
	const sortedArr = [...arr].sort((a, b) => a - b);

	// Check if the array is already sorted
	if (arr.join('') === sortedArr.join('')) {
		return true;
	}

	let l = -1; // Left index of the subarray to be swapped or reversed
	let r = -1; // Right index of the subarray to be swapped or  reversed

	// Find the first and last elements that are out of order
	for (let i = 0; i < n; i++) {
		if (arr[i] !== sortedArr[i]) {
			l = i;
			break;
		}
	}

	for (let i = n - 1; i >= 0; i--) {
		if (arr[i] !== sortedArr[i]) {
			r = i;
			break;
		}
	}

	// Swap the elements at indices l and r
	// do this first, since the requirement is if we can swap, use swap, otherwise use reverse
	const swappedArr = [...arr];
	[swappedArr[l], swappedArr[r]] = [swappedArr[r], swappedArr[l]];

	// Check if the swapped elements make the array sorted
	if (swappedArr.join('') === sortedArr.join('')) {
		console.log(`swap ${l + 1} ${r + 1}`);
		return true;
	}

	// Reverse the subarray from index l to r
	const reversedArr = [...arr.slice(0, l), ...arr.slice(l, r + 1).reverse(), ...arr.slice(r + 1)];

	// Check if the reversed subarray is now sorted
	if (reversedArr.join('') === sortedArr.join('')) {
		console.log(`reverse ${l + 1} ${r + 1}`);
		return true;
	}

	// If none of the above conditions are met, the array cannot be sorted
	return false;
}

