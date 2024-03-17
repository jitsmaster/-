/**
 * Calculate the length of the longest palindromic subsequence in a string.
 * @param s - The input string.
 * @returns The length of the longest palindromic subsequence.
 */
function longestPalindromeSubseq_td(s: string): number {
    const memo: number[][] = [];

    function recurse(left: number, right: number): number {
        // Base case: when left and right pointers cross each other
        if (left > right) {
            return 0;
        }
        else if (left ===  right)
            return 1;

        // Check if the subsequence has already been computed
        if (memo[left] && memo[left][right] !== undefined) {
            return memo[left][right];
        }

        let result: number;

        // Case 1: when the characters at left and right pointers are the same
        if (s[left] === s[right]) {
            result = 2 + recurse(left + 1, right - 1);
        } else {
            // Case 2: when the characters at left and right pointers are different
            const sub1 = recurse(left + 1, right);
            const sub2 = recurse(left, right - 1);
            result = Math.max(sub1, sub2);
        }

        // Store the computed result in the memoization table
        if (!memo[left]) {
            memo[left] = [];
        }
        memo[left][right] = result;

        return result;
    }

    return recurse(0, s.length - 1);
}