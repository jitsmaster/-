
/**
 * Given an integer array nums and an integer k, return the kth largest element in the array.
 *
 * Note that it is the kth largest element in the sorted order, not the kth distinct element.
 *
 * Can you solve it without sorting?
 *
 * Example 1:
 *
 * Input: nums = [3,2,1,5,6,4], k = 2
 * Output: 5
 *
 * Example 2:
 *
 * Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
 * Output: 4
 *
 * Constraints:
 *
 * 1 <= k <= nums.length <= 105
 * -104 <= nums[i] <= 104
 */
export function findKthLargest(nums: number[], k: number): number {
	//we will use the quick select algorithm to find the kth largest element, which has the time complexity of O(n) in average case
	k = nums.length - k; //since we are looking for the kth largest element, we are actually looking for the n - kth smallest element
	//if we are looking for kth smallest element, we will use k - 1	

	return quickSelect(0, nums.length - 1);

	function quickSelect(l: number, r: number) {
		//Here is how quick select works:
		//1. We pick a pivot element, which is the last element in the array (since it's easiest)
		//2. We partition the array into two parts: elements smaller than the pivot and elements larger than the pivot
		//3. If the index of the pivot element is equal to k, we return the pivot element
		//4. If the index of the pivot element is less than k, we recursively quick select the right part of the array
		//5. If the index of the pivot element is greater than k, we recursively quick select the left part of the array

		//Complexity: 
		//Time: O(n) in average case, O(n^2) in worst case : the actual time complexity is O(n) + O(n/2) + O(n/4) + ... + O(1) = O(2 * n)
		//Space: O(1), a few variables to store the pivot, pointer, constant space


		//pick the pivot element, in this case, the last element
		let pivot = nums[r];
		let pointer = l; //pointer to the first element smaller than the pivot
		//note that the pointer exlude the pivot element, since we do not use pivot element to compare with itself
		for (let i = l; i < r; i++) {
			if (nums[i] < pivot) {
				//when the pointer element is smaller than the pivot, we swap the pointer element with the current element
				//reason: we want to move all the elements smaller than the pivot to the left side of the array
				//if we encounter an elements that is largest than the pivot, the pointer is not being moved.
				//so next the element smaller then the pivot, we will need to move it before the pointer element

				//note that in the beginning, there are any swaps,
				//e.g. [3, 6, 1, 5, 2, 4], pointer is at 0, i is at 0, pointer element is same value as current element, this swap does nothing
				//next, i is 1 and pointer is 1 too, 6 is larger than 4, so we do nothing, thus pointer not moving, but i moved to 2
				//next, i is 2, 1 is smaller than 4, pointer is at 1, we swap 6 and 1, thus the array becomes [3, 1, 6, 5, 2, 4], pointer is at 2
				//this is how we move the smaller element to the left side of the array.

				[nums[pointer], nums[i]] = [nums[i], nums[pointer]];
				//move the pointer to the next element
				pointer++;
			}
			//if the current element is larger than the pivot, we do nothing, have the pointer stay at the same position
		}

		//at the end, swap the pivot element (right element) with the pointer element, part of the algorithm
		[nums[pointer], nums[r]] = [nums[r], nums[pointer]];
		//if the pointer is equal to k, we found the kth largest
		if (pointer === k) return nums[pointer];

		//if the pointer is less than k, we quick select the right part of the array
		if (pointer < k) return quickSelect(pointer + 1, r);

		//if the pointer is greater than k, we quick select the left part of the array
		return quickSelect(l, pointer - 1);
	}
};