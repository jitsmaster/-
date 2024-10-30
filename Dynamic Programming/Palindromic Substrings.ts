/*
Given a string s, return the number of palindromic substrings in it.

A string is a palindrome when it reads the same backward as forward.

A substring is a contiguous sequence of characters within the string.

 

Example 1:

Input: s = "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".
Example 2:

Input: s = "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
*/
function countSubstrings(s: string): number {

    /**
     * Count palindromes, very similar to longest substring palindrome, 
     * Difference is we are counting all the palindromes, instead of trying to build
     * the longest substring
     * @param left 
     * @param right 
     * @returns 
     */
    function countPalindromes(left: number, right: number): number {
        //same approach, count from middle
        //since for even case, we always start from i and i + 1, there won't be any dupes
        let count = 0;
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            //palindrome found, increment count
            count++;
            left--;
            right++;
        }
        return count;
    }

    let count = 0;

    for (let i = 0; i < s.length; i++) {
        //need to count palindromes of both odd and even
        //and add the total numbers
        //count odd length palindromes
        count += countPalindromes(i, i);
        //count even length palindromes
        count += countPalindromes(i, i + 1);
    }


    return count;
};