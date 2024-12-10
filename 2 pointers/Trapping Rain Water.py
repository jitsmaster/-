'''
Given n non-negative integers representing an elevation map where the width of each bar is 1, 
compute how much water it can trap after raining.

Example 1:

Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. 
In this case, 6 units of rain water (blue section) are being trapped.

Example 2:

Input: height = [4,2,0,3,2,5]
Output: 9
 
Constraints:

n == height.length
1 <= n <= 2 * 104
0 <= height[i] <= 105
'''
class Solution:
    def trap(self, height: List[int]) -> int:
        '''
        Analysis:
        Water is store between 2 walls. Our approach will be to use 2 pointers, one at the beginning and one at the end.
        We will keep track of the max height of the left wall and the max height of the right wall.
        We will move the pointer of the wall that has the smaller height, since that will be the limiting factor.
        We will calculate the water stored at each step as the difference between the max height of the wall and the current height of the wall.
        then add to the total water stored.

        Complexity: 
        Time: O(n) -  we only need to go through the array once
        Space: O(1) - we need to use 5 variables, so constant space
        '''
        water = 0
        l, r = 0, len(height) - 1
        lMaxH, rMaxH = height[l], height[r]

        while l < r:
            if (lMaxH < rMaxH):
                l += 1
                lMaxH = max(lMaxH, height[l])
                water += lMaxH - height[l] #since lMaxH will always be greater or equal to height l, we don't worry about negative number
            else:
                r -= 1
                rMaxH = max(rMaxH, height[r])
                water += rMaxH - height[r] #since rMaxH will always be greater or equal to height r, we don't worry about negative number

        return water