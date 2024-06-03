/**
 * You are given a string s and an integer k. You can choose any character of the string and change it to any other
 * uppercase English character. You can perform this operation at most k times.
 * 
 * Return the length of the longest substring containing the same letter you can get after performing the above
 * operations.
 */
function characterReplacement(s: string, k: number): number {
	//Analysis:
	//the idea is to use sliding window to find the longest substring, with only one character repeating, after changing at most k characters
	//We could using map to track the number of repeats for each character, but map is actually a little slower than using an array
	//using a 26 characters array instead of a map
	//indexing with number in an number is much faster than using a map, even both are O(1)
	let counts = new Array(26).fill(0);

	let left = 0;
	let maxLen = 0;
	let out = 0;
	let startCharCode = 'A'.charCodeAt(0);

	//sliding window, but no using while loop
	//since for loop is much easier to track logically
	for (let right = 0; right < s.length; right++) {
		//index of the character in the counts array
		const rightChrIdx = s.charCodeAt(right) - startCharCode;

		counts[rightChrIdx]++

		//sliding window trick:
		//idealing, if allowed, we should increment left and right pointers separately in one round of loop
		//the for loop already increment the right pointer
		if (counts[rightChrIdx] > maxLen) {
			maxLen = counts[rightChrIdx]
		}

		let numberToReplace = (right - left + 1) - maxLen;
		if (numberToReplace > k) {
			//increment left pointer, after incrementing right pointer, generatal rule of sliding window
			const leftChrIdx = s.charCodeAt(left) - startCharCode;
			counts[leftChrIdx]--
			left++;
		}

		out = Math.max((right - left) + 1, out);
	}

	return out;
};