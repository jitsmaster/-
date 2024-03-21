/**
 * Finds the kth permutation of an array using backtracking.
 * @param v - The input array.
 * @param k - The index of the desired permutation.
 * @returns The kth permutation of the array.
 */
function findKthPermutation(v: number[], k: number): number[] {
	//most important concept:
	//the index of next permutation is (k - 1) / (n - 1)! : number! represents the factorial of number
	//so we can use this concept to find the kth permutation
	//by caculating factorial of n-1, and find the index of the number to be added to the result
	//and remove the number from the array, and repeat the process until the array is empty
	//this is a more efficient way to find the kth permutation, compared to the backtracking method
	//which is more suitable for finding all permutations

	//Complexity:
	//Time: O(n * 2) - unlike the backtracking method, this method only needs to loop through each number once, 
	//and then loop through the numbers array once, so the time complexity is O(n * 2)
	//Space: O(n) - the numbers array will take O(n) space
	let fact = 1;
	const numbers: number[] = [];
	const n = v.length;

	for (let i = 1; i < n; i++) {
		fact = fact * i;
		numbers.push(i);
		//while calculating factorial, we can also push the numbers 1 to n-1 to the numbers array
	}

	//also push the length of the array into the sequence too
	numbers.push(n);

	let result = [] as number[];

	//instead of using recursion, we can use a while loop to find the kth permutation
	//and do the same thing as the backtrack function, while prevent potential stack overflow
	while (true) {
		let nextIdx = Math.floor((k - 1) / fact);
		if (nextIdx < 0) {
			nextIdx = numbers.length - 1;
			//if nextIdx is negative, means last k was a multiple of fact,
			//that normally means 0.
			//this is the edge case to take the last number in the array as next index
		}
		//(k-1)/fact is the index of the number to be added to the result
		result.push(numbers[nextIdx]);
		numbers.splice(nextIdx, 1);

		if (numbers.length === 0) {
			break;
		}

		k = k % fact;
		fact = fact / numbers.length;
	}

	return result;
}