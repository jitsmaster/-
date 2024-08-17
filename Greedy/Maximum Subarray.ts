/**
 * Given an integer array nums, find the subarray with the largest sum, and return its sum.
 *
 * Example 1:
 *
 * Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
 * Output: 6
 * Explanation: The subarray [4,-1,2,1] has the largest sum 6.
 *
 * Example 2:
 *
 * Input: nums = [1]
 * Output: 1
 * Explanation: The subarray [1] has the largest sum 1.
 *
 * Example 3:
 *
 * Input: nums = [5,4,-1,7,8]
 * Output: 23
 * Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
 *
 * Constraints:
 *
 * 1 <= nums.length <= 105
 * -104 <= nums[i] <= 104
 *
 * Follow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.
 */

function maxSubArray(nums: number[]): number {
	//Analsys:
	/**
	 * The maximum subarray problem is the task of finding the contiguous subarray within an array of numbers
	 * that has the largest sum. In other words, we want to find the subarray with the maximum sum of its elements.
	 *
	 * The algorithm used in this code is considered greedy because it makes locally optimal choices at each step
	 * to find the overall optimal solution.
	 *
	 * Let's break down the code to understand how it works:
	 *
	 * The function maxSubArray takes an array of numbers nums as input and returns a number, which represents
	 * the maximum sum of a subarray.
	 *
	 * The variables max and sub are initialized. max is set to the first element of the input array nums,
	 * and sub is set to 0.
	 *
	 * The code then iterates over each element n in the nums array using a for...of loop.
	 *
	 * Inside the loop, the algorithm makes a greedy choice. It checks if the current sub value is negative.
	 * If it is negative, it means that adding it to the current element n would decrease the sum.
	 * In this case, it sets sub to 0, effectively starting a new subarray from the current element.
	 *
	 * After updating sub, the algorithm adds the current element n to sub to calculate the sum of the subarray.
	 *
	 * The algorithm then updates the max variable by comparing the current sub value with the current max value
	 * and selecting the larger one. This ensures that max always stores the maximum sum found so far.
	 *
	 * Once the loop finishes, the algorithm has iterated through all elements of the nums array and found
	 * the maximum sum of a subarray. It returns the max value as the result.
	 *
	 * The greedy aspect of this algorithm lies in the decision to reset sub to 0 whenever it becomes negative.
	 * By doing so, the algorithm discards any negative contributions to the sum and starts a new subarray
	 * from the current element. This approach allows the algorithm to focus on finding the subarray
	 * with the largest sum without being influenced by negative values.
	 *
	 * Overall, the greedy algorithm used in this code provides an efficient solution to the maximum subarray
	 * problem by making locally optimal choices at each step.
	 */

	//Complexity:
	//Time: O(n), n is the length of the input array nums, as we iterate through the array once
	//Space: O(1), as we use a constant amount of extra space for variables max and sub

	let max = nums[0];
	let sub = 0;

	for (let n of nums) {
		//the greedy part: we don't need to add sub to current number, if the sub is negative
		//so set it as 0, which means to start over from current number to calculate sum
		sub = Math.max(sub, 0);
		sub += n;
		max = Math.max(sub, max);
	}

	return max;
}

/**
 * This function uses the divide and conquer approach to solve the maximum subarray problem.
 * It's not as efficient as the greedy algorithm, but it's a good example of how divide and conquer works
 * @param nums 
 * @returns 
 */
function maxSubArrayDivideAndConque(nums: number[]): number {
	//Complexity:
	//Time: O(n log n), where n is the length of the input array nums, as we divide the array in half at each step, 
	// 	thus log n levels of recursion, and each level takes O(n) time
	//Space: O(log n), as the recursion stack has a depth of log n

	// Base case: if the array has only one element, return that element
	if (nums.length === 1) {
		return nums[0];
	}

	// Divide the array into two halves
	const mid = Math.floor(nums.length / 2);
	const leftHalf = nums.slice(0, mid);
	const rightHalf = nums.slice(mid);

	// Recursively find the maximum subarray sum in the left and right halves
	const maxLeft = maxSubArrayDivideAndConque(leftHalf);
	const maxRight = maxSubArrayDivideAndConque(rightHalf);

	// Find the maximum subarray sum that crosses the midpoint
	let maxCross = 0;
	let leftSum = -Infinity;
	let rightSum = -Infinity;

	for (let i = mid - 1; i >= 0; i--) {
		maxCross += nums[i];
		leftSum = Math.max(leftSum, maxCross);
	}

	maxCross = 0;

	for (let i = mid; i < nums.length; i++) {
		maxCross += nums[i];
		rightSum = Math.max(rightSum, maxCross);
	}

	// Return the maximum of the three sums
	return Math.max(maxLeft, maxRight, leftSum + rightSum);
}
