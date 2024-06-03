/**
 * Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.
 * In other words, return true if one of s1's permutations is the substring of s2.
 */
function checkInclusion(s1: string, s2: string): boolean {
	//Analysis: The problem is similar to finding anagrams
	//The approach is to use a sliding window
	//The window size is s1.length
	//We will use 2 maps to store the count of characters in s1 and s2
	//We will compare the maps to check if the characters in the window match
	//If they match, we will return true
	//If not, we will slide the window to the right
	//When the window is slided, we will update the counts in the maps

	//Complexity Analysis:
	//Time complexity: O(n) where n is the length of s2
	//Space complexity: O(1) because the maps will have at most 26 characters

	if (s1.length > s2.length) return false;

	const startCharCode = 'a'.charCodeAt(0);

	//create 2 maps with 26 characters
	const map1 = new Array(26).fill(0);
	const map2 = new Array(26).fill(0);

	//fill the first map with the characters of s1
	//and the second map with the first s1.length characters of s2
	for (let i = 0; i < s1.length; i++) {
		map1[s1.charCodeAt(i) - 97]++;
		map2[s2.charCodeAt(i) - 97]++;
	}

	//use a separate variable to store matches
	//this will avoid doing full on comparison of the maps on each iteration
	let matches = 0;
	for (let i = 0; i < 26; i++) {
		if (map1[i] === map2[i]) matches++;
	}

	//sliding window
	let l = 0;
	for (let r = s1.length; r < s2.length; r++) {
		//if all characters match, return true
		if (matches === 26) return true;

		const chrCodeL = s2.charCodeAt(l) - startCharCode;
		const chrCodeR = s2.charCodeAt(r) - startCharCode;

		//for s2, increment the count of right character
		//since the window is moving to the right, the left character is going out of the window
		//and the right character is coming in
		map2[chrCodeR]++;

		//if the new right side character count matches the count in s1, increment matches
		if (map2[chrCodeR] === map1[chrCodeR])
			matches++;
		//if the new right side character count of s2 is one more than the count in s1, 
		//means the right side character count increased once, so decrement matches
		else if (map2[chrCodeR] === map1[chrCodeR] + 1)
			matches--;

		//for s2, decrement the count of left character
		//Important: Do not do this together with right character increment
		map2[chrCodeL]--;

		//if the left side character count matches the count in s1, increment matches
		if (map2[chrCodeL] === map1[chrCodeL])
			matches++;
		//if the left side character count of s2 is one less than the count in s1,
		//means the left side character is being removed once, so decrement matches
		else if (map2[chrCodeL] === map1[chrCodeL] - 1)
			matches--;

		l++;
	}

	return matches === 26;
};