function sherlockAndMinimax(arr: number[], p: number, q: number): number {
	//Complexity:
	// - Time: O(n log n) - Sorting and 3 times iterations
	// - Space: O(1) - 2 variables, constant space

	//Analysis:
	// - Sort the array
	// - Find the min distance from p to the array
	// - Find the mid point between each pair of elements
	// - If p is less than the mid point and q is greater than the mid point, find the min distance from the mid point to the array
	// If the mid point is between p and q, find the min distance from the mid point to the array
	// - If the min distance is greater than the max distance, update the max distance and the minMaxIndex
	// - Find the min distance from q to the array

	//Sort first: Signature of greedy approach
	arr.sort((a, b) => a - b);
	let min = Infinity;
	let minMaxIndex = p;

	for (let n of arr) {
		const d = Math.abs(n - p);
		if (d < min) {
			min = d;
		}
	}

	let max = min;
	min = Infinity;

	for (let i = 1; i < arr.length; i++) {
		const mid = Math.ceil((arr[i] + arr[i - 1]) / 2);
		if (p < mid && mid < q) {
			min = Math.min(mid - arr[i - 1], arr[i] - mid);
			if (min > max) {
				max = min;
				minMaxIndex = mid;
			}
		}
	}

	min = Infinity;
	for (let n of arr) {
		const d = Math.abs(n - q);
		if (d < min) {
			min = d;
		}
	}

	if (min > max) {
		minMaxIndex = q;
		max = min;
	}

	return minMaxIndex;

}