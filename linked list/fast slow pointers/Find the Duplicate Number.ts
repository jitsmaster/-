/**
 * Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.
 * 
 * There is only one repeated number in nums, return this repeated number.
 * 
 * You must solve the problem without modifying the array nums and uses only constant extra space.
 * 
 * Example 1:
 * 
 * Input: nums = [1,3,4,2,2]
 * Output: 2
 * 
 * Example 2:
 * 
 * Input: nums = [3,1,3,4,2]
 * Output: 3
 * 
 * Example 3:
 * 
 * Input: nums = [3,3,3,3,3]
 * Output: 3
 * 
 * Constraints:
 * 
 * 1 <= n <= 105
 * nums.length == n + 1
 * 1 <= nums[i] <= n
 * All the integers in nums appear only once except for precisely one integer which appears two or more times.
 * 
 * Follow up:
 * 
 * How can we prove that at least one duplicate number must exist in nums?
 * Can you solve the problem in linear runtime complexity?
 */

function findDuplicate(nums: number[]): number {
	//fast slow pointer
	//the idea is to treat the array as a linked list
	//the value of the array is the next node's index
	//since there is a duplicate, there will be a cycle
	//we can find the cycle with fast and slow pointer
	//then we find the intersection with 2 slow pointers
	//This is called Floyds Tortoise and Hare (Cycle Detection) algorithm
	//https://en.wikipedia.org/wiki/Cycle_detection#Tortoise_and_hare

	//MOST IMPORTANT: the requiement mentions "each integer is in the range [1, n] inclusive".
	//That means the value of the array is the index of the next node
	//that is where our pointers come from.
	//The fast pointer moves 2 steps as nums[nums[fast]], slow moves 1 step as nums[slow]

	let fast = 0;
	let slow = 0;

	//first user fast and slow to detect the cycle
	//note that this cycle is not start of the cycle, it's where 2 pointers meet
	while (true) {
		slow = nums[slow]
		fast = nums[nums[fast]]

		if (slow === fast) {
			break; //we break at the minimum cycle, where 2 pointers meet after same round of advancement
		}
	}

	//second part of Floyd's algorithm, The rule is where the 2 pointers first meet, has the same steps to the start of cycle, as from the start of the linked link
	//So we can use 2 slow pointers to find the start of the cycle
	let slow2 = 0;

	while (true) {
		slow = nums[slow]
		slow2 = nums[slow2]
		if (slow === slow2)
			return slow;
	}
};

function findDuplicateFast(nums: number[]): number {
	// Here's a breakdown of what each part does:

	// The code uses a for loop to iterate over each element in the nums array.
	// Inside the loop, it retrieves the value at the current index using nums[Math.abs(nums[i])].
	// The Math.abs() function is used to ensure that the index is positive, as negative indices are not valid in JavaScript arrays.
	// It then checks if the retrieved value is positive.
	// If it is, it means that the number at that index has not been visited before.
	// If the value is positive, it negates it by assigning its negative value to the same index in the nums array.
	// This marks the number as visited.
	// If the value is negative, it means that the number has already been visited before, indicating a duplicate.
	// In this case, the absolute value of the number is returned as the duplicate number.
	// If no duplicate is found after iterating through the entire array, the function returns -1.
	// This code is used to find a duplicate number in an array of integers.
	// It utilizes the fact that the array contains numbers in the range of 1 to n, where n is the length of the array.
	// By negating the values at the corresponding indices, it effectively marks the visited numbers.
	// If a number is encountered again and its value is already negative, it means it has been visited before and is therefore a duplicate.

	//this is still a pointer approach, it's quite a bit faster than the Floyd's algorithm
	//the idea is to treat the array as a linked list
	//the value of the array is the next node's index
	//if the value is visisted, mark it as negative
	//if the value is negative, it's a duplicate
	for (let num of nums) {
		// Get the value at the current index
		let val = nums[Math.abs(num)];

		// Check if the value is positive
		if (val > 0)
			// If positive, mark it as visited by negating it
			//this both maintain the next pointer (Math.abs), and mark it as visited
			nums[Math.abs(num)] = -nums[Math.abs(num)];
		else
			// If negative, it means we have already visited this number before, so it's a duplicate
			return Math.abs(num);
	}

	// If no duplicate is found, return -1
	return -1;
}
