class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        # Complexity:
        # Time: O(nlogn) - patient sort, where n is the length of the input array, outer loop is O(n), and binary search is O(logn)
        # Space: O(n) - piles list, where n is the length of the input array, worst case is when the input array is sorted in decreasing order, no increasing subsequence

        # use patient sort to solve this problem with nlogn time complexity, comparing to n^2 dp solution
        # patient sort is a greedy algorithm that is used to solve the longest increasing subsequence problem
        # the idea is to keep track of the smallest number that can be the end of a subsequence of length i
        # for all i from 1 to n, where n is the length of the input array
        # the algorithm uses binary search to find the correct position for each number in the sorted array
        # the length of the longest increasing subsequence is the length of the sorted array

        # initialize an empty list to store the end of the subsequence of length i
        piles = []

        for num in nums:
            # use binary search to find the correct position for the current number in the sorted array
            # left will be the index of the smallest number that is greater than or equal to the current number
            left, right = 0, len(piles)
            while left < right:
                mid = left + (right - left) // 2
                if piles[mid] < num:
                    left = mid + 1
                else:
                    right = mid

            # at the end, if the number is greater than all the numbers in the sorted array, left will be equal to the length of the sorted array
            # due to line 20

            # if the current number is greater than all the numbers in the sorted array, add it to the end
            # this is based on the patient sort algorithm, means it doesn't belong to any piles
            # since each pile is always at decrease order
            if left == len(piles):
                piles.append(num)                
            # otherwise, update the number at the correct position
            else:
                piles[left] = num

        return len(piles)