
/**
 * KMP (Knuth-Morris-Pratt) pattern matching algorithm, used to find all occurrences of a pattern in a text.
 * This algorithm is more efficient than the naive pattern matching algorithm, which has a time complexity of O(n * m),
 * @param text 
 * @param pattern 
 * @returns 
 */
function kmpSearch(text: string, pattern: string): number[] {
	//Complexity:
	//Time: O(n + m) - we are iterating through the text and the pattern
	//Space: O(n) - the size of the prefix table is pattern length + 1

	// Build the prefix table based on the pattern
	const prefixTable = buildPrefixTable(pattern);

	// Array to store the indices where pattern matches are found
	const result: number[] = [];
	// Pointers for text and pattern
	let i = 0;
	let j = 0;

	// Iterate through the text
	while (i < text.length) {
		// If characters at current positions match, move both pointers forward
		if (text[i] === pattern[j]) {
			i++;
			j++;
		}

		// If the entire pattern is matched, add the starting index to the result
		// and update the pointer j using the prefix table
		if (j === pattern.length) {
			result.push(i - j);
			j = prefixTable[j - 1];
		}
		// If characters don't match and j is not at the beginning of the pattern,
		// update j using the prefix table
		else if (i < text.length && text[i] !== pattern[j]) {
			if (j !== 0) {
				j = prefixTable[j - 1];
			}
			// If j is at the beginning of the pattern, move i forward
			else {
				i++;
			}
		}
	}

	return result;

	/**
	 * Build the prefix table for the pattern.
	 * The prefix table is used to skip characters in the text when a mismatch occurs.
	 * It is built in linear time.
	 * @param pattern The pattern to build the prefix table for
	 * @returns The prefix table
	 */
	function buildPrefixTable(pattern: string): number[] {
		//Complexity:
		//Time: O(n) - we are iterating through the pattern
		//Space: O(n) - the size of the prefix table is pattern length plus 1

		// The prefix table is always 1 size bigger than the pattern length
		// The first item is -1, since it will never be used
		const prefixTable: number[] = [-1];
		let prefixLength = 0;
		let i = 1;

		while (i < pattern.length) {
			// If the characters at positions i and prefixLength are equal,
			// increment prefixLength and store its value in the prefixTable at index i.
			if (pattern[i] === pattern[prefixLength]) {
				prefixLength++;
				prefixTable[i] = prefixLength;
				i++;
			} else {
				// If the characters at positions i and prefixLength are not equal,
				// check if prefixLength is not zero.
				if (prefixLength !== 0) {
					// If prefixLength is not zero, update prefixLength to the value
					// stored in the prefixTable at index prefixLength - 1.
					prefixLength = prefixTable[prefixLength - 1];
				} else {
					// If prefixLength is zero, store zero in the prefixTable at index i
					// and increment i.
					prefixTable[i] = 0;
					i++;
				}
			}
		}

		return prefixTable;
	}
}

// Example usage:
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";
const matches = kmpSearch(text, pattern);
console.log("Pattern matches found at indices:", matches);