// Larry has been given a permutation of a sequence of natural numbers incrementing from as an array.
// He must determine whether the array can be sorted using the following operation any number of times:

// This function determines whether the given array can be sorted using a 3 element rotations
function larrysArray(arr: number[]): string {
	//Complexity Analysis
	//Time complexity: O(n^2) - two nested loops
	//Space complexity: O(1) - only a few variables are used

	//Naive approach will be rotating 3 elements from beginning to end to rotate the smallest element to the front
	//and then keep on rotating until the array is sorted
	//However, this approach is not efficient.
	//A better approach is to count the number of inversions in the array.
	//If the number of inversions is even, then the array can be sorted using the given operation.
	//Otherwise, it cannot be sorted.

	//how inversion counters work:
	//An inversion is a pair of elements (arr[i], arr[j]) such that i < j and arr[i] > arr[j].
	//For example, in the array [2, 4, 1, 3], the pairs (2, 1) and (4, 1) are inversions.
	//The number of inversions in an array is the number of such pairs.
	//this looks making no sense, but it's a way to determine if the array can be sorted using the given operation

	let inversions = 0; // Initialize a variable to keep track of the number of inversions in the array.

	// Iterate through each element in the array.
	for (let i = 0; i < arr.length; i++) {
		// Compare the current element with the elements that come after it.
		for (let j = i + 1; j < arr.length; j++) {
			// If the current element is greater than any of the elements that come after it,
			// it means there is an inversion.
			if (arr[i] > arr[j]) {
				inversions++; // Increment the inversion count.
			}
		}
	}

	// If the number of inversions is even, it means the array can be sorted using the given operation.
	// Otherwise, it cannot be sorted.
	return inversions % 2 === 0 ? "YES" : "NO";
}