/**
 * Given a string s, find the length of the longest substring without repeating characters.
 * @param str 
 * @returns 
 */
function longestSubstringWithoutRepeat(str: string): string {
	let longestSubstring = '';
	let currentSubstring = '';

	for (let i = 0; i < str.length; i++) {
		const char = str[i];
		const charIndex = currentSubstring.indexOf(char);

		if (charIndex !== -1) {
			if (currentSubstring.length > longestSubstring.length) {
				longestSubstring = currentSubstring;
			}

			currentSubstring = currentSubstring.slice(charIndex + 1);
		}

		currentSubstring += char;
	}

	return currentSubstring.length > longestSubstring.length ? currentSubstring : longestSubstring;
}

function lengthOfLongestSubstring(s: string): number {
	//using set
	//note: set is faster than array for checking if an element exists
	//time complexity: O(n) - iterate through the string once, instead of having inner loop
	//space complexity: O(n) - set will store all the unique characters

	//edge case: if the string is empty, return 0
	if (s.length === 0) return 0;

	const set = new Set<string>();
	let lPtr = 0, rPtr = 1;
	let maxLength = 1;

	set.add(s[0]);

	while (rPtr < s.length) {
		const char = s[rPtr];
		if (!set.has(char)) {
			//is the substring doesn't have the character, add it to the set
			//and move the right pointer, after set the max length;
			set.add(char);
			maxLength = Math.max(maxLength, rPtr - lPtr + 1);
			rPtr++;
		} else {
			//if the character is already in the set, remove the char at the left pointer, and increment the left pointer
			//next round, it will check again on the same right character
			//this is how we achieve O(n) time complexity, instead of having inner loop with O(n^2).
			set.delete(s[lPtr]);
			lPtr++;
		}
	}
	return maxLength;
}