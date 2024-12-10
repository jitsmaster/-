class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        #use 2 pointers with outer loop, the outer loop will be each number, but we need to avoid dupes,
        #so we will sort the array first

        #sort the array
        nums.sort()
        result = []

        lastHead = None

        #outer loop
        for head in nums:
            #avoid dupes
            if head == lastHead:
                continue
            lastHead = head

            #2 pointers
            l = nums.index(head) + 1
            r = len(nums) - 1

            while(l < r):
                sum = head + nums[l] + nums[r]
                if (sum == 0):
                    result.append([head, nums[l], nums[r]])
                    l += 1
                    r -= 1
                    #avoid dupes
                    while l < r and nums[l] == nums[l-1]:
                        l += 1
                    while l < r and nums[r] == nums[r+1]:
                        r -= 1
                elif (sum < 0):
                    l += 1
                else:
                    r -= 1

        return result
