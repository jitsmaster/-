# Given an integer array nums, find a subarray
# that has the largest product, and return the product.

# The test cases are generated so that the answer will fit in a 32-bit integer.


# Example 1:

# Input: nums = [2,3,-2,4]
# Output: 6
# Explanation: [2,3] has the largest product 6.
# Example 2:

# Input: nums = [-2,0,-1]
# Output: 0
# Explanation: The result cannot be 2, because [-2,-1] is not a subarray.


# Constraints:

# 1 <= nums.length <= 2 * 104
# -10 <= nums[i] <= 10
# The product of any subarray of nums is guaranteed to fit in a 32-bit integer.


class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        # Kadane's algorithm is used to find the maximum subarray sum, but we can adapt it for this problem.
        # The key idea is to keep track of both the maximum and minimum product up to each element.
        # This is because a negative number can turn a minimum product into a maximum product.

        # We initialize our result with the first element of the array.
        # We also initialize current maximum and minimum products as 1.

        # For each element in the array:
        # 1. We calculate temporary maximum product (tmpMax) using the current element and previous max.
        # 2. We update curMax as the maximum of:
        #    a) Current element multiplied by previous max
        #    b) Current element multiplied by previous min
        #    c) Current element itself
        # 3. We update curMin similarly
        # 4. We update our result if curMax is greater

        # This way, we consider all possible subarrays ending at the current element,
        # and keep track of the overall maximum product.

        res = nums[0]  # base case, single number being max product
        curMin, curMax = 1, 1  # 1 as base number for product

        # reason for tracking both min and max is because a negative number can turn a minimum product into a maximum product, or vice versa.
        # edge case: when encounter 0, we reset curMin and curMax to 1, because the product will be 0 after that forever,
        # if we don't reset, we will always get 0 as the result.
        for n in nums:
            tmpMax = (
                n * curMax
            )  # use a temp variable, since we are reassigning curMax, base still need curMax later for curMin
            # `curMax = max(n * curMax, n * curMin, n)` is updating the current maximum product of
            # subarrays. It calculates the maximum product considering three cases:
            # 1. The current number `n` multiplied by the previous maximum product `curMax`.
            # 2. The current number `n` multiplied by the previous minimum product `curMin`.
            # 3. Just the current number `n` alone.
            curMax = max(n * curMax, n * curMin, n)

            # `curMin = min(n * curMin, tmpMax, n)` is updating the current minimum product of
            # subarrays. It calculates the minimum product considering three cases:
            # 1. The current number `n` multiplied by the previous minimum product `curMin`.
            # 2. The temporary maximum product `tmpMax` which was calculated using the previous
            # maximum product and the current number.
            # 3. Just the current number `n` alone.
            curMin = min(n * curMin, tmpMax, n)
            # `res = max(res, curMax)` is updating the variable `res` to store the maximum value
            # between the current value of `res` and the current maximum product `curMax`. This
            # ensures that `res` always holds the maximum product found so far as we iterate through
            # the array.
            res = max(res, curMax)

        return res
