import { permute } from "../backtracking/permutations";

//solution is a little brute force, but it works. And permute function is using backtracking to generate all possible permutations of an array.
function calculateMinAwkwardness(arr: number[]) {
	// Time Complexity: O(n! * n)
	// Space Complexity: O(n!)

	//flow: 1. sort the array, 
	//      2. generate all possible permutations of the array, 
	//      3. iterate through each permutation and calculate the maximum awkwardness between adjacent guests, 
	//      4. update the minimum awkwardness with the max value found so far
	const n = arr.length;
	let minAwkwardness = Infinity;

	// Sort the array in ascending order
	arr.sort((a, b) => a - b);

	// Generate all possible permutations of seat assignments
	const permutations = permute(arr);

	// Iterate through each seating arrangement
	for (const permutation of permutations) {
		let maxAwkwardness = 0;

		// Calculate the maximum awkwardness between adjacent guests
		for (let i = 0; i < n; i++) {
			//(i + 1) % n is used to handle the case when i is the last index of the array, so that we can compare the last element with the first element
			const awkwardness = Math.abs(permutation[i] - permutation[(i + 1) % n]);
			maxAwkwardness = Math.max(maxAwkwardness, awkwardness);
		}

		// Update minAwkwardness with the minimum value found so far
		minAwkwardness = Math.min(minAwkwardness, maxAwkwardness);
	}

	return minAwkwardness;
}
