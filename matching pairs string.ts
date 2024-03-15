function matchingPairs(s: string, t: string) {
	//this is a tricky problem, the key is to find out how many pairs are matching
	//not how many times need to swap to match t
	//if swap one and match happens, when we have length of s pairs matching
	//if not, we will need to max the number of matching pairs for each swap

	// can only swap characters once in s to match t

	//Complexity Analysis:
	//Time complexity: O(n^2) - we have 2 nested loops to iterate through s
	//Space complexity: O(1) - just one new variable to store the matching pairs count, and string after swapping

	//try swapping each characters in s to check if it matches t
	let matchingPairs = 0;

	for (let i = 0; i < s.length; i++) {
		//recurse call to swapMatch on next characters
		for (let j = i + 1; j < s.length; j++) {
			//swap characters at i and j
			const newS = s.substring(0, i) + s[j] + s.substring(i + 1, j) + s[i] + s.substring(j + 1);
			//after swapping, exact match, then the pairs will be the length of s
			if (newS === t) {
				return s.length;
			}
			else {
				//not exact match, find out how many pairs are matching
				let pairs = 0;
				for (let k = 0; k < s.length; k++) {
					if (newS[k] === t[k]) {
						pairs++;
					}
				}

				matchingPairs = Math.max(matchingPairs, pairs);
			}
		}
	}

	return matchingPairs;
}
