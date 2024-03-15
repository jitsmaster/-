// Lexicographical order is often known as alphabetical order when dealing with strings. A string is greater than
// another string if it comes later in a lexicographically sorted list.

// Given a word, create a new word by swapping some or all of its characters. This new word must meet two criteria:

// It must be greater than the original word
// It must be the smallest word that meets the first condition
// Example

// The next largest word is .

// Complete the function biggerIsGreater below to create and return the new string meeting the criteria. If it is
// not possible, return no answer.
function biggerIsGreater(word: string): string {
	// The algorithm is as follows:
	// 1. Find the first character that is smaller than the character to its right, start from the end
	// 2. Find the smallest character to the right of chars[i] that is greater than chars[i]
	// 3. Swap chars[i] and chars[j]
	// 4. Reverse the suffix starting from i+1, in place, using 2 pointers

	//Complexity: 
	//Time: O(n + n + n/2) where n is the length of the string - iterate through the string 2 times, and 2 pointer to reverse the suffix
	//Space: O(n) where n is the length of the string - need a n size array to store the result

	// Edge case: if the word has only 1 character, it is already the largest possible permutation
	if (word.length === 1) {
		return 'no answer';
	}

	// Convert the word into an array of characters
	const chars = word.split('');

	// Find the first character that is smaller than the character to its right, from end
	let i = chars.length - 2;
	while (i >= 0 && chars[i] >= chars[i + 1]) {
		i--;
	}

	// If no such character is found, the word is already the largest possible permutation
	if (i === -1) {
		return 'no answer';
	}

	// Find the smallest character to the right of chars[i] that is greater than chars[i]
	let j = chars.length - 1;
	while (chars[j] <= chars[i]) {
		j--;
	}

	// Swap chars[i] and chars[j]
	[chars[i], chars[j]] = [chars[j], chars[i]];

	// Reverse the suffix starting from i+1, in place, using 2 pointers
	// This is done to get the smallest possible permutation	
	let left = i + 1;
	let right = chars.length - 1;

	while (left < right) {
		[chars[left], chars[right]] = [chars[right], chars[left]];
		left++;
		right--;
	}

	// Convert the array back to a string and return it
	return chars.join('');
}
