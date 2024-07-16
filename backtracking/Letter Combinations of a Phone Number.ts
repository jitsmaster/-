/**
 * Given a string containing digits from 2-9 inclusive, return all possible letter combinations
 * that the number could represent. Return the answer in any order.
 *
 * A mapping of digits to letters (just like on the telephone buttons) is given below.
 * Note that 1 does not map to any letters.
 *
 * Example 1:
 *
 * Input: digits = "23"
 * Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
 *
 * Example 2:
 *
 * Input: digits = ""
 * Output: []
 *
 * Example 3:
 *
 * Input: digits = "2"
 * Output: ["a","b","c"]
 *
 * Constraints:
 *
 * 0 <= digits.length <= 4
 * digits[i] is a digit in the range ['2', '9'].
 */
function letterCombinations(str: string): string[] {
	//this is a simple backtracking problem that generate permutations
	//the spin is that we have to manually construct the mapping table
	const res = [] as string[]

	//pad 2 empty arrays in front, since the number is from 2-9
	var combos = [
		[],
		[],
		["a", "b", "c"],
		["d", "e", "f"],
		["g", "h", "i"],
		["j", "k", "l"],
		["m", "n", "o"],
		["p", "q", "r", "s"],
		["t", "u", "v"],
		["w", "x", "y", "z"]
	];

	var ds = str.split("").map((d) => parseInt(d))
		.filter(d => !isNaN(d) && d >= 2 && d <= 9);

	//edge case, no numbers, return empty array
	if (!ds.length) {
		return res;
	}

	permute(0, "");

	return res;

	function permute(start: number, permu: string) {
		//base case, if we reach the end of the digits, push the permutation to the result
		if (start = ds.length) {
			res.push(permu);
			return;
		}

		const chrs = combos[ds[start]];
		//for each character in the current digit, append it to the permutation
		//and recurse with the next digit, then backtrack
		for (let chr of chrs) {
			permu += chr;
			permute(start + 1, permu);
			permu = permu.substring(0, permu.length - 1);
		}
	}
}
