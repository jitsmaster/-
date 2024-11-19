# Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is
# equal or false otherwise.


# Example 1:

# Input: nums = [1,5,11,5]
# Output: true
# Explanation: The array can be partitioned as [1, 5, 5] and [11].
# Example 2:

# Input: nums = [1,2,3,5]
# Output: false
# Explanation: The array cannot be partitioned into equal sum subsets.


# Constraints:

# 1 <= nums.length <= 200
# 1 <= nums[i] <= 100


class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        # Analysis:
        # instead of traditional array based dp, we can use set based dp to reduce the space complexity
        # The idea is for each number in the input array, we will add it to the sum of all the numbers in the dp set
        # Any new numbers generated will be added to the original dp set
        # Eventually, we will have a all combinations of the sum of the numbers in the input array in the set
        # We can break early if the sum of the numbers in the dp set is equal to the target sum
        # At the end, return false, since the generated set doesn't contain the target sum

        #Complexity: 
        #Time: O(n * sum), where n is the length of the input array, we have two nested loops, the outer loop is O(n), and the inner loop is O(sum), where sum is the sum of all numbers in the input array
        #Space: O(sum), where sum is the sum of all numbers in the input array, the dp set will contain all the possible sums of the numbers in the input array
        dp = set()
        dp.add(0)
        total = sum(nums)

        # early elimination: if the sum of all numbers is odd, no way to partition the array into two equal sum subsets
        if total % 2 != 0:
            return False

        # target sum is half of the total sum, otherwise, we cannot divide
        target = total // 2

        # go through all numbers in the array
        for num in nums:
            temp_dp = set()
            # inner loop to add the current number to all the numbers in the dp set
            # we don't want to add the new numbers to the dp set while iterating through the dp set
            # so we add the new numbers to a temp set, and union the temp set back to the dp set
            for val in dp:
                new_val = val + num
                if new_val == target:
                    return True
                temp_dp.add(new_val)

            dp = dp.union(temp_dp)

        return False
