/**
 * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
 * where nums[i] + nums[j] + nums[k] == 0, and the indices i, j and k are all distinct.
 *
 * The output should not contain any duplicate triplets.
 * You may return the output and the triplets in any order.
 * 
 * @param nums 
 * @returns 
 */
function threeSum(nums: number[]) {
	//Analysis: Because we don't want any dupes, the best way to remove them is to sort the array first
	//and as we loop through the numbers, we are capturing the head, if this head is equals to last head, then we skip
	//as we get the head, it becomes a 2 sums problem for right of this number,
	//we get the target sum for the 2 and do 2 pointers approach.
	//note that we still need to skip dupes for the 2nd number, so that becomes a inner loop
	//instead of continue on the loop, we just need to moving the left pointer until no dupes.

	//Complexity:
	//Time: O(n^2 + logn) - we have to loop through the array, and for each number, we do 2 pointers approach, which is a while loop too, and we have to sort first
	//Space: O(n) - we are storing the result in an array.

	//first sort
	nums.sort((a, b) => a - b);

	const tSums = [];
	let lastHead = -Infinity;

	for (let i = 0; i < nums.length; i++) {
		const head = nums[i];
		if (head === lastHead)
			continue;

		lastHead = head;
		//remains nums to the right with 2 ptrs
		let l = i + 1;
		let r = nums.length - 1;
		while (l < r) {
			const sum = head + nums[l] + nums[r];
			if (sum === 0) {
				tSums.push([head, nums[l], nums[r]]);
				const mid = nums[l];

				//there could be multiple pairs in the range
				//so need to keep searching
				l++;
				r--;
				//here we also need to make sure the 2nd number is not repeating
				while (l < r && nums[l] === mid) {
					l++;
				}
			}
			else if (sum > 0) {
				r--;
			}
			else {
				l++;
			}
		}
	}

	return tSums;
}