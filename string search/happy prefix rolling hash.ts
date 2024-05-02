/**
 * Rolling hash implementation.
 * A rolling hash is a hash function that allows efficient computation of a hash value for a sliding window of a string.
 * It is commonly used in string searching algorithms, such as the Rabin-Karp algorithm.
 */
/**
 * Rolling hash implementation.
 * A rolling hash is a hash function that allows efficient computation of a hash value for a sliding window of a string.
 * It is commonly used in string searching algorithms, such as the Rabin-Karp algorithm.
 */
class RollingHash {
	private power: number[] = [1];

	/**
	 * Creates an instance of the RollingHash class.
	 * @param base The base value used in the rolling hash calculation.
	 * @param mod The modulus value used in the rolling hash calculation.
	 */
	constructor(public base: number, public mod: number) {
	}

	/**
	 * Computes the rolling hash value for the given string.
	 * @param str The string for which to compute the rolling hash.
	 * @returns The rolling hash value of the string.
	 */
	public getHash(str: string): number {
		let hash = 0;

		for (let i = 0; i < str.length; i++) {
			const charCode = str.charCodeAt(i) - 'a'.charCodeAt(0);
			// the formula is (hash * base + charCode) % mod
			// the following is to avoid overflow
			hash = ((hash % this.mod) * (this.base % this.mod) + charCode) % this.mod;
		}

		return hash;
	}
}

/**
 * Using hash to compare prefix and suffix.
 * Not the fastest solution, just a different approach.
 * @param s 
 * @returns 
 */
function longestPrefixRollingHash(s: string): string {
	//reason for this modulo number:
	//the module number needs be a prime number (undividable), and 10^9 is a common choice for hashing algorithms.
	const mod = Math.pow(10, 9) + 7;
	const rollingHash = new RollingHash(26, mod);

	let prefix = '';
	let suffix = '';
	let maxPrefix = '';

	for (let i = 0; i < s.length - 1; i++) {
		prefix += s[i];
		suffix = s[s.length - 1 - i] + suffix;

		if (rollingHash.getHash(prefix) === rollingHash.getHash(suffix)) {
			maxPrefix = prefix;
		}
	}

	return maxPrefix;
}