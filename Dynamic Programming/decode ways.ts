/**
 * You have intercepted a secret message encoded as a string of numbers. The message is decoded via the following mapping:
 *
 * "1" -> 'A'
 *
 * "2" -> 'B'
 *
 * ...
 *
 * "25" -> 'Y'
 *
 * "26" -> 'Z'
 * 
 * Key Concepts:
 * 1. This is a Dynamic Programming problem because:
 *    - It has overlapping subproblems (same substring needs to be decoded multiple times)
 *    - It has optimal substructure (solution to larger string depends on solutions to smaller substrings)
 * 
 * Algorithm Explanation:
 * 1. We use a DP array where dp[i] represents the number of ways to decode the substring s[0...i-1]
 * 
 * 2. For each position i, we have two possibilities:
 *    a) Take single digit (if it's not '0'): 
 *       - If s[i-1] is not '0', we can decode it as a single letter
 *       - Add dp[i-1] to dp[i] (inherit ways from previous position)
 * 
 *    b) Take two digits (if valid):
 *       - If s[i-2,i-1] forms a valid number (10-26)
 *       - Add dp[i-2] to dp[i] (inherit ways from two positions back)
 * 
 * Example:
 * s = "226"
 * - dp[0] = 1 (empty string, base case)
 * - dp[1] = 1 ("2" -> B)
 * - dp[2] = 2 ("22" -> BB or V)
 * - dp[3] = 3 ("226" -> BBF or VF or BZ)
 * 
 * Recurrence Relation:
 * dp[i] = 0 initially
 * if s[i-1] != '0': dp[i] += dp[i-1]
 * if "10" ≤ s[i-2,i-1] ≤ "26": dp[i] += dp[i-2]
 * 
 * Base Cases:
 * dp[0] = 1 (empty string)
 * dp[1] = 1 if s[0] != '0', else 0
 * 
 * Time Complexity: O(n) - we iterate through the string once
 * Space Complexity: O(n) - we use a DP array of size n+1
 * 
 * Edge Cases:
 * 1. Empty string -> return 0
 * 2. String starting with '0' -> first position will be 0
 * 3. Invalid sequences like "30" or "06" are handled by our conditions
 */

function numDecodings(s: string): number {
    // Edge case: empty string has no valid decodings
    if (s.length === 0) {
        return 0;
    }

    // Initialize DP array: dp[i] represents number of ways to decode s[0...i-1]
    const dp: number[] = new Array(s.length + 1).fill(0);
    
    // Base cases:
    // Empty string has 1 way to decode (needed for the recurrence to work)
    dp[0] = 1;
    // First position depends on whether first character is '0'
    dp[1] = s[0] !== '0' ? 1 : 0;

    // Iterate through the string starting from position 2
    for (let i = 2; i <= s.length; i++) {
        // Case 1: Single digit decode
        // If current digit is not '0', we can use it as a single character
        // Add all the ways we could decode up to the previous position
        if (s[i - 1] !== '0') {
            //e.g. "226" -> 2nd "2" can be decoded as "B", so we inherit ways from 2nd "2" for "6"
            dp[i] += dp[i - 1];
        }

        // Case 2: Two digit decode
        // Check if previous two digits form a valid number (10-26)
        const twoDigit = parseInt(s.substring(i - 2, i));
        // If valid two-digit number, add all the ways we could decode
        // up to two positions back
        if (twoDigit >= 10 && twoDigit <= 26) {
            //reason to inherit from i - 2: we can decode the two digits as a single letter
            //e.g. "226" -> "22" can be decoded as "V", so we inherit ways from "2" for "6"
            dp[i] += dp[i - 2];
        }
    }

    // Final entry in dp array contains total number of ways to decode entire string
    return dp[s.length];
}
