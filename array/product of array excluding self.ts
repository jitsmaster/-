/**
 * Given an integer array nums, return an array output where output[i] is the product of all the elements
 * of nums except nums[i].
 * 
 * Each product is guaranteed to fit in a 32-bit integer.
 * 
 * Follow-up: Could you solve it in O(n) time without using the division operation?
 * 
 * @param nums 
 * @returns 
 */
function productExceptSelf(nums: number[]) {
	//Complexity Analysis
	//Time complexity: O(n), where n is the number of elements in the array, note this is 3 * n
	//Space complexity: O(n), where n is the number of elements in the array, note this is 3 * n - each we are storing 2 different arrays

	//Note: we can do better than this, with only 1 *n space, and 2 * n time, in the next function solution

	//calculate no prefix and suffix

	//The idea is to calculate the prefix and suffix of each element separately,
	//and the result is the product of the prefix (i - 1) and suffix (i + 1) of each element
	//for prefix, start from 0, and each value is the value times the previous value
	const prefixes = nums
		.reduce((acc, cur, i) => {
			let prefixVal = cur;
			if (i > 0) {
				prefixVal *= acc[i - 1];
			}
			acc.push(prefixVal)
			return acc;
		}, [] as number[])

	//for suffix, start from the end, and each value is the value times the next value
	const suffixes = [...nums]
		.reverse()
		.reduce((acc, cur, i) => {
			let suffixVal = cur;
			if (i > 0) {
				suffixVal *= acc[i - 1];
			}
			acc.push(suffixVal)
			return acc;
		}, [] as number[])
		.reverse();

	//the final result is the prefix[i - 1] * suffix[i+1]
	return nums
		.map((n, i) => {
			const prefix = i < 0 ? 1 : prefixes[i - 1];
			const suffix = i > nums.length - 1 ? 1 : suffixes[i + 1];
			return prefix * suffix;
		});
}

function productExceptSelf2N(nums: number[]) {
	//This is the 2*n time and 1*n space solution
	//We don't need to store the prefix and suffix separately, we can just calculate them on the fly

	const res = [] as number[];
	let prefix = 1;
	let suffix = 1;

	//calculate the prefix by itself,
	//the prefix is just the product of all the elements before the current element
	for (let i = 0; i < nums.length; i++) {
		res[i] = prefix;
		prefix *= nums[i];
	}

	//calcuate the suffix together with the result, no need to store them separately
	//the suffix is the product of all the elements after the current element
	for (let i = nums.length - 1; i >= 0; i--) {
		//note that we don't use the current suffix for result, instead, the prefix suffix
		res[i] *= suffix;
		suffix *= nums[i];
	}

	return res;
}

