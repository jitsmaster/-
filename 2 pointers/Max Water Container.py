class Solution:
    def maxArea(self, heights: List[int]) -> int:
        # use 2 pointers from wider to narrow
        maxArea = 0

        l = 0
        r = len(heights) - 1
        while l < r:
            minHeight = min(heights[l], heights[r])
            area = minHeight * (r - l)  # area is between l and r times min height
            maxArea = max(area, maxArea)
            # different from normal 2 pointers, we only want to move the shorter side
            if heights[l] < heights[r]:
                l += 1
            else:
                r -= 1

        return maxArea
