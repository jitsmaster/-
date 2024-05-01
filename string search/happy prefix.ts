/**
 * A string is called a happy prefix if is a non-empty prefix which is also a suffix (excluding itself).
 * 
 * Given a string s, return the longest happy prefix of s. Return an empty string "" if no such prefix exists.
 * 
 * @param s The input string
 * @returns The longest happy prefix of s
 */
function longestPrefix(s: string): string {
	//Complexity:
	//Time: O(n) - we are iterating through the string
	//Space: O(1) - we are using constant spaces for 2 strings

	//unless the traditional 2 pointer approach, which starts small from both ends
	//we start big from both ends, prefix and suffix will both be the whole string minus 1 char.
	//we shrink the range on both sides until prefix and suffix are equal
	let prefix = s.slice(0, s.length - 1);
	let suffix = s.slice(1, s.length);
	while (prefix !== suffix) {
		prefix = prefix.substring(0, prefix.length - 1);
		suffix = suffix.substring(1);
	}
	return prefix;
};

function longestPrefixKMP(s: string): string {
	//Complexity:
	//Time: O(n) - we are iterating through the string
	//Space: O(n) - the size of the prefix table is the length of the string plus 1

	//build the prefix table, which is the longest prefix that is also a suffix
	const prefixTable: number[] = buildPrefixTable(s);

	//the longest happy prefix is the substring from the beginning to the last element 
	//value of the prefix table
	return s.substring(0, prefixTable[s.length]);
}



/**
 * Builds the prefix table for a given string.
 * The prefix table is an array that stores the length of the longest proper prefix that is also a suffix for each position in the string.
 * The prefix table is used in string searching algorithms like the Knuth-Morris-Pratt (KMP) algorithm.
 *
 * @param s - The input string.
 * @returns The prefix table as an array of numbers.
 */
function buildPrefixTable(s: string) {

	const prefixTable: number[] = new Array(s.length + 1).fill(0);
	prefixTable[0] = -1;
	let k = -1;

	for (let i = 1; i <= s.length; i++) {
		// For each character in the string, check if the character at index k of string is not equal to the 
		// character at index i - 1 of string.
		// If this is true, it sets k to the value at index k of prefixTable.
		// This step is essentially backtracking to the longest prefix that is also a suffix of the current substring.

		/*
		If the characters at s[k] and s[i - 1] are equal, or if k is less than 0 (which means no backtracking is possible),
		it increments k and sets the value at index i of prefixTable to k.
		This step is extending the current longest prefix that is also a suffix.
		*/
		while (k >= 0 && s[k] !== s[i - 1])
			k = prefixTable[k];

		prefixTable[i] = ++k;
	}
	return prefixTable;
}
