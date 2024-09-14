/**
 * Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.
 *
 * The following rules define a valid string:
 *
 * Any left parenthesis '(' must have a corresponding right parenthesis ')'.
 * Any right parenthesis ')' must have a corresponding left parenthesis '('.
 * Left parenthesis '(' must go before the corresponding right parenthesis ')'.
 * '*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".
 *
 * Example 1:
 *
 * Input: s = "()"
 * Output: true
 * Example 2:
 *
 * Input: s = "(*)"
 * Output: true
 * Example 3:
 *
 * Input: s = "(*))"
 * Output: true
 *
 * Constraints:
 *
 * 1 <= s.length <= 100
 * s[i] is '(', ')' or '*'.
 */
function checkValidString(s: string): boolean {
	//Analysis:
	//We are solving it with greedy approach:
	//We keep track of the minimum and maximum number of left parenthesis that are not matched.
	//If we encounter a right parenthesis, we decrease the minimum and maximum number of left parenthesis that are not matched.
	//If we encounter a left parenthesis, we increase the minimum and maximum number of left parenthesis that are not matched.
	//If we encounter a star, we have three options: decrease, increase, or do nothing.
	//So max is increase, and min is decrease
	//Meanwhile, we will make sure the min number is not negative.
	//If we encounter a right parenthesis and the max number is negative, we know that it is not valid. (since it's not recoverable as any position)
	//If we reach the end, we know that it is valid if the min number is 0.

	//Complexity:
	//Time: O(n), we go through the string once
	//Space: O(1), we only use constant space (2 variables)

	//both min and max are the number of left parenthesis that are not matched.
	let lMin = 0;
	let lMax = 0;

	for (let chr of s) {
		//encounter left p, increase min and max
		if (chr === '(') {
			lMin++;
			lMax++;
			//encounter right p, decrease min and max
		} else if (chr === ')') {
			lMin = Math.max(0, lMin - 1);
			lMax--;
		} else {
			//encounter star, we have three options: decrease, increase, or do nothing
			//so max is increased, and min is decreased
			lMin = Math.max(0, lMin - 1);
			lMax++;
		}

		//if max is negative, we know it's not valid, and we cannot recover from it
		//so we return false
		if (lMax < 0) {
			return false;
		}
	}

	//if we reach the end, we know that it is valid if the min number is 0, means all left parenthesis are matched
	return lMin === 0;
}
