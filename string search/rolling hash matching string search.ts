class RollingHash {

	constructor(public base: number, public mod: number) {
	}
	/**
	 * Building string hash value using rolling hash approach.
	 * When the sliding window moves, we can calculate the new hash value based on the previous hash value.
	 * This allows us to compare substrings in constant time.
	 * The hash value is calculated as follows:
	 * prev
	 * @param s 
	 * @param start 
	 * @param end 
	 * @returns 
	 */
	buildHash(s: string, start: number = 0, end: number = s.length): number {
		//the hash value is calculated as follows:
		//hash = s[0] * 26^(n-1) + s[1] * 26^(n-2) + ... + s[n-1] * 26^0
		let hash = 0;
		for (let i = start; i < end; i++) {
			//the formula is (hash * base + charCode) % mod, following is equivalent to this formula
			//but avoiding overflow due to large multiplied number.
			hash = ((hash % this.mod) * (this.base % this.mod) + (s.charCodeAt(i) - 97)) % this.mod;
		}
		return hash;
	}

	rollHash(hash: number, length: number, leaving: string, entering: string) {
		const leavingVal = (leaving.charCodeAt(0) - 97) * Math.pow(26, length - 1);
		const enteringVal = entering.charCodeAt(0) - 97;
		//the hash value is calculated as follows:
		//hash = (hash - leaving * 26^(length-1)) * 26 + entering
		return (hash - leavingVal) * 26 + enteringVal;
	}
}

function searchString(s: string, search: string, charSetCount?: number, mod?: number, charCompare?: boolean = false): number[] {
	//Complexity:
	//Time: O(n + m) - build initial hash twice, and iterate through the string. 
	//It's possible to have hash matching without actual string matching, if the modulo number is not large enough.
	//Space: O(1) - we are using constant space for 2 hashed values

	if (searchString.length > s.length) {
		return [];
	}

	const rollingHash = new RollingHash(
		charSetCount || 26, //default just 26 English alphabet characters, if the entire unicode charset count is passed in, this base number could be huge
		mod || Math.pow(10, 9) + 7); //default to a large prime number 10^9 + 7, could ultimately avoid collision, so the brute per char checking is not needed that often

	const result: number[] = [];
	const searchHash = rollingHash.buildHash(search);

	let hash = rollingHash.buildHash(s, 0, search.length);

	if (hash === searchHash) {
		//hash matches, compare the strings brute force
		if (actualCompare(0, charCompare))
			result.push(0);
	}

	for (let i = 1; i < s.length - search.length; i++) {
		hash = rollingHash.rollHash(hash, search.length, s[i], s[i + search.length]);
		if (hash === searchHash) {
			//hash matches, compare the strings brute force
			if (actualCompare(i, charCompare))
				result.push(i);
		}
	}
	return result;

	/**
	 * If we are confident that the modulo number is large enough to capture the actual string variation, 
	 * then hit can just return true directly.
	 * Otherwise, we need to compare the actual string to make sure it is a real match.
	 * @param i 
	 * @returns 
	 */
	function actualCompare(i: number, performCheck: boolean = true) {
		if (!performCheck)
			return true;

		let match = true;
		for (let j = 0; j < search.length; j++) {
			if (s[i + j] !== search[j]) {
				match = false;
				break;
			}
		}

		return match;
	}
}