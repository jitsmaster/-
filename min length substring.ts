function minLengthSubstring(s: string, t: string) {
	function hasAllCharacters(subArr: string[]) {
		for (let i = 0; i < t.length; i++) {
			const index = subArr.indexOf(t[i]);
			if (index < 0) {
				return false;
			}

			//remove the character from sArr, since match is found
			subArr.splice(index, 1);
		}

		return true;
	}

	//2 pointers approach
	let left = 0;
	let right = t.length - 1; //the window cannot be smaller then the size of target string

	let minLen = Infinity;

	while (right < s.length) {
		const subS = s.substring(left, right + 1);
		const sArr = subS.split('');

		if (hasAllCharacters(sArr)) {
			//if match found, increase left side the narrow the search
			minLen = Math.min(minLen, subS.length);
			left++;
		}
		else {
			//if no match found, increase right side to widen the search
			right++;
		}
	}

	return minLen === Infinity ? -1 : minLen;
}
