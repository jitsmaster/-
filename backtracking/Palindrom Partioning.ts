/**
 * Given a string s, partition s such that every substring
 * of the partition is a palindrome. Return all possible
 * palindrome partitioning of s.
 *
 * Example 1:
 *
 * Input: s = "aab"
 * Output: [["a","a","b"],["aa","b"]]
 *
 * Example 2:
 *
 * Input: s = "a"
 * Output: [["a"]]
 *
 * Constraints:
 *
 * 1 <= s.length <= 16
 * s contains only lowercase English letters.
 */
function partition(s: string): string[][] {
	const res: string[][] = [];
	backtrack(0, [])

	return res

	function backtrack(start: number, parts: string[]) {
		//the keyword of this problem is "partioning", not subsets
		//that means we cannot have each result in any order
		//The combined string from the parts have to be the original string
		//the approach will be using a pointer this time

		//Complexity:
		//Time: O(n*2^n) where n is the length of the string, 2^n for backtracking, and each n/2 for 2 pointers
		//Space: O(n) for recursion stack, and O(n) for the result storage

		//when the pointer reaches the end, we finished going through the string
		//so push the parts in
		if (start > s.length - 1) {
			res.push([...parts]);
			return;
		}

		//construct the string on the fly, much faster than slice or substring
		let substr = ""
		for (let i = start; i < s.length; i++) {
			substr += s[i]
			if (isPalindrome(start, i)) {
				//push the current range in partitions
				parts.push(substr)
				backtrack(i + 1, parts)
				//backtrack, when finish last attempt
				parts.pop()
			}
		}
	}

	/**
	 * 2 pointers approach to figure out if a string is palindrome
	 * difference is we pass in the pointers, not the substring, since it's faster
	 * @param left 
	 * @param right 
	 * @returns 
	 */
	function isPalindrome(left: number, right: number) {
		while (left < right) {
			if (s[left] !== s[right])
				return false;
			left++;
			right--;
		}
		return true;
	}
};
