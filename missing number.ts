/**
 * Given an array nums containing n distinct numbers in the range [0, n], 
 * return the only number in the range that is missing from the array.
 * @param nums 
 * @returns 
 */
function missingNumber(nums: number[]): number {
	//Time Complexity: O(N) + O(N - 1) which is asymptotically equivalent to O(N)
	// Space Complexity: O(1), algorithm runs in constant space.

	//Cyclic sort approach
	//We will sort the array in place by swapping the numbers to their correct indices
	//Then we will iterate through the array to find the missing number
	//If no missing number is found, we return the length of the array

	// Initialize a variable i to 0
	let i = 0;

	// Start a while loop that runs as long as i is less than the length of the nums array
	while (i < nums.length) {
		// Assign the value at index i in the nums array to a variable j
		const j = nums[i];

		// Check if the value at index i is less than the length of the nums array
		// and if the value at index i is not equal to the value at index j
		if (nums[i] < nums.length && nums[i] !== nums[j]) {
			// Swap the values at index i and index j in the nums array using destructuring assignment
			[nums[i], nums[j]] = [nums[j], nums[i]];
		} else {
			// If the condition is not met, increment i by 1
			i++;
		}
	}

	// Start a for loop that iterates from 0 to the length of the nums array
	for (let i = 0; i < nums.length; i++) {
		// Check if the value at index i in the nums array is not equal to i
		if (nums[i] !== i) {
			// If the condition is met, return the missing number i
			return i;
		}
	}

	// If no missing number is found, return the length of the nums array
	return nums.length;

}

function kthMissingNumber(arr: number[], k: number): number {
	//Complexity Analysis
	//Time Complexity: O(N), where N is the length of the arr array.
	//Space Complexity: O(1), as we do not use any extra space.

	let missed = 0; // Initialize a variable to keep track of the number of missing numbers
	let index = 0; // Initialize a variable to keep track of the current index in the array
	let num = 0; // Initialize a variable to keep track of the current number
	let length = arr.length; // Get the length of the array

	// Start a while loop that runs as long as the number of missing numbers is less than k
	//and not reaching the end of the array
	while (missed < k && num <= arr[length - 1]) {
		// Check if the current index is greater than or equal to the length of the array
		// or if the value at the current index in the array is not equal to the current number
		if (index >= length || arr[index] !== num) {
			missed++; // Increment the number of missing numbers
		} else {
			++index; // Increment the current index
		}
		++num; // Increment the current number
	}

	return num - 1;
	//Return the last number checked minus 1 as the kth missing number, 
	//or the last item in the array
};

function onlyMissingNumberSimple(nums: number[]) {
	//Complexity Analysis
	//Time Complexity: O(N), where N is the length of the nums array. - We iterate through the array once and build a the complete sum once.
	//Space Complexity: O(1) - just 2 variables are used, constant space.

	// the simple algorithm is to minus the sum of the array from the complete sum of the array.
	const sum = nums.reduce((acc, curr) => acc + curr, 0);
	const n = nums.length;

	const completeSum = n * (n + 1) / 2;

	return completeSum - sum;
}