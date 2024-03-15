function isAnagram(s: string, t: string): boolean {
	//Complexity: 
	//Time: O(n + n + n) - n is the length of the string, interating through both string once and then iterating through the map
	//Space: O(n) - n is the length of the string, we are using a map to store the count of characters
	if (s.length !== t.length)
		return false;

	//create a map with count
	const charMap: Map<string, number> = new Map()

	//set both string into the map
	//first string will have positive count
	//second string will have negative count
	//if both strings are anagram, the count will be 0 for all characters	
	for (let i = 0; i < s.length; i++) {
		if (charMap.get(s[i]) === undefined) {
			charMap.set(s[i], 1)
		}
		else {
			charMap.set(s[i], charMap.get(s[i]) + 1)
		}
	}

	for (let i = 0; i < t.length; i++) {
		if (charMap.get(t[i]) === undefined) {
			charMap.set(t[i], 1)
		}
		else {
			charMap.set(t[i], charMap.get(t[i]) - 1)
		}
	}

	let res = true;
	for (let [key, value] of charMap) {
		if (value !== 0) {
			res = false
			break
		}
	}

	return res
};