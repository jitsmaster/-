"""
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

 

Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]
 

Constraints:

1 <= n <= 8
"""


class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        # Complexity:
        # Time: O(4^n/sqrt(n)) - for each of the 2n (pair to make sure for one combo of ()) steps, we can have 2 choices, open or close, so 2^2n choices
        # Space: O(n) - stack space is linear to the number of parenthesis

        # This function generates all combinations of well-formed parentheses
        # It uses dynamic programming to build the solution

        # dp[i] will store all valid combinations for i pairs of parentheses
        # We start with an empty string for 0 pairs
        # For each number of pairs, we consider all ways to add a pair of parentheses
        # We can add () around any previous solution, and append any solution after it

        # initialize the dp array with the base case
        dp = [[""]]

        # iterate from 1 to n
        for i in range(1, n + 1):
            # initialize the current list
            current = []

            # iterate from 0 to i
            for j in range(i):
                # get the left and right parenthesis
                for left in dp[j]:
                    for right in dp[i - j - 1]:
                        # append the left and right parenthesis
                        current.append("({}){}".format(left, right))
            # append the current list to the dp array
            dp.append(current)

        return dp[-1]  # return the last element of the dp array as result
