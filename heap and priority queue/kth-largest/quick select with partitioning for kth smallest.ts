function findKthSmallestNumberQuickSelect(arr: number[], k: number): number {
	//quick select with partitioning
	//this is the same as quick sort, but we only need to sort the kth smallest number


	let start = 0;
	let end = arr.length - 1;

	//use while loop instead of recursion
	//space complexity is O(1) instead of O(log n)
	while (start < end) {
		const pivot = partition(start, end);

		if (pivot === k - 1) {
			return arr[pivot];
		}
		if (pivot < k - 1) {
			//search the right side,
			start = pivot + 1;
		}
		else {
			//search the left side
			end = pivot - 1;
		}
	}

	return -1;


	function partition(start: number, end: number): number {
		//Complexity:
		//Time: O(n) - we are iterating through the array
		//Space: O(1) - we are doing this in place

		//just use the end as the pivots,
		//the goal to is move all numbers smaller than pivot to the left
		//and all numbers greater than pivot to the right

		const pivot = arr[end];
		let i = start;
		for (let j = start; j < end; j++) {
			if (arr[j] < pivot) {
				//everything smaller than pivot should be on the left
				//we just swap the element with the start element
				[arr[i], arr[j]] = [arr[j], arr[i]];
				//start element moves to the right
				//for next loop
				i++;
			}
		}
		[arr[i], arr[end]] = [arr[end], arr[i]];

		//return the index of the pivot at the finalized order
		return i;
	}
}