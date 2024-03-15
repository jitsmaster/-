function maxNumber(nums1: number[], nums2: number[], k: number): number[] {
	const m = nums1.length;
	const n = nums2.length;
	const result: number[] = [];

	for (let i = Math.max(0, k - n); i <= Math.min(k, m); i++) {
		const subsequence1 = getMaxSubsequence(nums1, i);
		const subsequence2 = getMaxSubsequence(nums2, k - i);
		const merged = mergeArrays(subsequence1, subsequence2);
		if (isGreater(merged, 0, result, 0)) {
			result.splice(0, k, ...merged);
		}
	}

	return result;
}

/**
 *  Get the maximum subsequence of length k, from a number array
 * @param nums 
 * @param k 
 * @returns 
 */
function getMaxSubsequence(nums: number[], k: number): number[] {
	// create a stack to store the maximum subsequence
	const stack: number[] = [];
	const n = nums.length;
	// the number of elements to drop
	let drop = n - k;

	//use a stack to capture decreasing sequence
	//this is the best way to capture a decreasing sequence and maintain the order
	for (const num of nums) {
		// drop the last element if it is less than the current number
		while (drop > 0 && stack.length > 0 && stack[stack.length - 1] < num) {
			stack.pop();
			drop--;
		}
		//push num to the stack
		stack.push(num);
	}

	return stack.slice(0, k);
}

/**
 * Merge push the highest numbers from both arrays to a new array
 * @param nums1 
 * @param nums2 
 * @returns 
 */
function mergeArrays(nums1: number[], nums2: number[]): number[] {
	const merged: number[] = [];
	let i = 0;
	let j = 0;

	while (i < nums1.length || j < nums2.length) {
		if (isGreater(nums1, i, nums2, j)) {
			merged.push(nums1[i]);
			i++;
		} else {
			merged.push(nums2[j]);
			j++;
		}
	}

	return merged;
}

function isGreater(nums1: number[], i: number, nums2: number[], j: number): boolean {
	//compare the numbers in both arrays
	//if the numbers are equal, move to the next numbers
	while (i < nums1.length && j < nums2.length && nums1[i] === nums2[j]) {
		i++;
		j++;
	}

	//if we have reached the end of the 2nd array, then the first array is greater
	//otherwise, the 2nd array is greater, if the number in the 1st array is greater than the number in the 2nd array, and first array didn't reach the end
	return j === nums2.length || (i < nums1.length && nums1[i] > nums2[j]);
}
