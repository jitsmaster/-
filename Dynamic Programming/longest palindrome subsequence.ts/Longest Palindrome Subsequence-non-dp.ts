/* Given a string s, return the longest palindromic substring in s.
 *
 * Example 1:
 *
 * Input: s = "babad"
 * Output: "bab"
 * Explanation: "aba" is also a valid answer.
 *
 * Example 2:
 *
 * Input: s = "cbbd"
 * Output: "bb"
 *
 * Constraints:
 *
 * 1 <= s.length <= 1000
 * s consist of only digits and English letters.
 */
function longestPalindrome(s: string): string {
    //This is the non-dp approach
    //The idea is to start from center character and span out to check longest palindrome
    //There are two cases:
    //1. odd length palindrome -  odd number of characters, with the center char in the middle
    //2. even length palindrome - even number of characters, with the center char and the char to it's right (easiest)
    // in the middle

    //Analysis:
    //Time complexity: O(n^2) - Looping the whole string once for outer loop, and 2 inner loops to check
    //odd and even cases, since inner loop is potential checking the entire string, it's O(n), so 
    //O(n^2)
    //Space complexity: O(1) - One variable to store the longest palindrome substring, and two variables to store left and right pointers

    let lpss = "";

    function checkPalindrome(l: number, r: number) {
        // check if the substring is a palindrome
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            l--;
            r++;
        }
        // return the palindrome substring
        // this is when it's out of loop and left is just 1 less than last left, and right is just 1 more than last right
        // of the substring left is  l + 1, to start at the right position
        // right is r, because r is just 1 more than last right of the substring, and substring function will not include it
        return s.substring(l + 1, r);
    }

    for (let i =0; i < s.length; i++) {
        // check for odd length palindrome
        let odd = checkPalindrome(i, i);
        // check for even length palindrome
        let even = checkPalindrome(i, i + 1);
        // update the longest palindrome substring
        // get the longest
        lpss = odd.length > lpss.length ? odd : lpss;
        lpss = even.length > lpss.length ? even : lpss;
    }

    return lpss;
}