# Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a 
# space-separated sequence of one or more dictionary words.

# Note that the same word in the dictionary may be reused multiple times in the segmentation.

 

# Example 1:

# Input: s = "leetcode", wordDict = ["leet","code"]
# Output: true
# Explanation: Return true because "leetcode" can be segmented as "leet code".
# Example 2:

# Input: s = "applepenapple", wordDict = ["apple","pen"]
# Output: true
# Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
# Note that you are allowed to reuse a dictionary word.
# Example 3:

# Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
# Output: false
 

# Constraints:

# 1 <= s.length <= 300
# 1 <= wordDict.length <= 1000
# 1 <= wordDict[i].length <= 20
# s and wordDict[i] consist of only lowercase English letters.
# All the strings of wordDict are unique.

class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        #Complexity:
        #Time: O(n * m) - outer loop for every position in the string, inner loop for every word
        #Space: O(n) - n + 1 dp array size
        
        # init the array as size of n + 1, n is the length of string
        # Note: this array stores whether the string is breakable starting from the position
        n = len(s)
        dp = [False] * (n + 1) #default to false for each item
        dp[n] = True #base case, the extra item, start in DP, which doesn't represent anything, but important for first item from the end
        
        #we start from the back of the string forward
        #resolve subproblem at the end first        
        for i in range(n - 1, -1, -1):
            for word in wordDict:
                lastPosFromEnd = i + len(word)
                if (lastPosFromEnd < n
                    and s[i: lastPosFromEnd] == word):
                    # `dp[i] = dp[lastPosFromEnd]` is assigning the value of `dp[lastPosFromEnd]` to
                    # `dp[i]`. This step is crucial in dynamic programming as it helps in building up
                    # the solution incrementally. By assigning the value of `dp[lastPosFromEnd]` to
                    # `dp[i]`, we are essentially propagating the information about whether the
                    # substring starting at position `i` is breakable based on the information
                    # available at position `lastPosFromEnd`. This helps in determining if the current
                    # substring can be segmented into words from the dictionary.
                    dp[i] = dp[lastPosFromEnd]
                if dp[i]:
                    break
        
        return dp[0]
                