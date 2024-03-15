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

