function longestPalindrome(s: string): string {
	let longest = '';
	//the approach is take a center point 1 by 1 and expand around it to find the longest palindrome
	//only way to find it efficiently is to take 2 center points, one for odd length and one for even length
	//combination of 2 pointers and greedy approach
	for (let i = 0; i < s.length; i++) {
		// Check for odd length palindromes
		let left = i;
		let right = i;
		while (left >= 0 && right < s.length && s[left] === s[right]) {
			const current = s.substring(left, right + 1);
			if (current.length > longest.length) {
				longest = current;
			}
			left--;
			right++;
		}

		// Check for even length palindromes
		left = i;
		right = i + 1;
		while (left >= 0 && right < s.length && s[left] === s[right]) {
			const current = s.substring(left, right + 1);
			if (current.length > longest.length) {
				longest = current;
			}
			left--;
			right++;
		}
	}

	return longest;
}

