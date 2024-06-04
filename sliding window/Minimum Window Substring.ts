/**
 * Given two strings s and t of lengths m and n respectively, return the minimum window substring
 * of s such that every character in t (including duplicates) is included in the window. If there
 * is no such substring, return the empty string "".
 *
 * The testcases will be generated such that the answer is unique.
 */
function minWindow(s: string, t: string): string {
	//Analysis: The problem is similar to finding anagrams
	//The approach is to use a sliding window
	//The window size is s.length
	//We will use 2 maps to store the count of characters in s and t
	//We will compare the maps to check if the characters in the window match
	//If they match, we will return true
	//If not, we will slide the window to the right
	//When the window is slided, we will update the counts in the maps

	if (s.length > s.length) return "";

	const tMap = new Map<string, number>();

	//fill the map with the characters of t
	//this allows us to keep track of the characters in t
	for (let i = 0; i < t.length; i++) {
		tMap.set(t[i], (tMap.get(t[i]) ?? 0) + 1);
	}

	//NOTE: this map is not used in traditional sense
	//if the character count is 0, that means the same character is in the window
	//initially, the acount of all characters are what is in t
	//as we add characters to the window, we decrement the count,
	//as we remove characters from the window, we increment the count
	//if the all character count is 0, that means we have all the characters in the window

	//use a separate variable to store matches
	//this will avoid doing full on comparison of the maps on each iteration
	let matches = 0;

	//sliding window
	let l = 0;

	//we are tracking 2 variables: minLen and minStart
	//minLen will store the minimum length of the window
	//minStart will store the starting index of the minimum window
	//this way, we can get the sbustring of t using minStart and minLen at the end
	let minLen = s.length + 1;
	let minStart = 0;

	//the idea is to keep on expanding right side of the window, until we find a window that contains all characters of t,
	//we jog down the left and length of the window;
	//if order to find min size, we will start shrinking the window from the left side, until we no longer have all characters of t
	//we job down the left side of the window before the last operation and current length of the window

	//effectively, this is a nested loop,
	//outer loop expand the right
	//inner loop shrink the left
	//while inner loop is looping, outer loop is paused
	for (let r = 0; r < s.length; r++) {
		const chrR = s[r];
		//if the right character is in t, that means we added a included character
		//so match increment;
		if (tMap.has(chrR)) {
			//the idea of a character is showing is that the count of the character
			//is 0, so for every character in t, we will decrement the count of this characters in the map
			tMap.set(chrR, tMap.get(chrR)! - 1);

			//if the count is 0 or more, increment matches
			if (tMap.get(chrR)! >= 0) matches++;
		}

		//if the number of matches is equal to the length of t, we have found a window
		while (matches === t.length) {
			//get the minimum length and starting index of the window
			//if the current window is smaller than the previous window, update the minLen and minStart
			if (r - l + 1 < minLen) {
				minLen = r - l + 1;
				minStart = l;
			}

			//shrink the window from the left
			const chrL = s[l];
			//if the target contains the left character, that means
			//we are removing the character from the window
			//so the match count should be decremented
			if (tMap.has(chrL)) {
				//increment the count of the character in the map
				//when it's being removed from the window
				tMap.set(chrL, tMap.get(chrL)! + 1);

				//if the count didn't reach 0 yet, that means we will be missing the characters
				//so decrement matches, since this is post removal of left side, we use > 0 instead of >= 0
				if (tMap.get(chrL)! > 0) matches--;
			}

			l++;
		}
	}

	return minLen > s.length ? "" : s.substring(minStart, minStart + minLen);

};