/**
 * You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from
 * robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken 
 * into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

 

Example 1:

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
Example 2:

Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.
 

Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 400
 */

function rob(nums: number[]): number {
    //Analysis:
    //since we cannot rob adjacent houses, we need to find a way to maximize the amount of money we can rob
    //the basic idea is to keep track of the maximum amount of money we can rob

    //Complexity:
    //Time: O(n) - we iterate through the array once
    //Space: O(1) - we are using 2 variables to store the maximum amount of money we can rob

    let r1 = 0, r2 = 0;

    //go through the numbers
    //the basic formula is:
    // r2 = Math.max(n + r1, r2)
    // r1 = r2

    //reason:
    // r2 is the maximum amount of money we can rob up to the current house
    // r1 is the maximum amount of money we can rob up to the previous house
    // n is the current house
    // if we rob the current house, we add the money in the current house to the maximum amount of money we can rob up to the house before the previous house
    // if we do not rob the current, we take the maximum amount of money we can rob up to the previous house
    //e.g. [r1, r2, n] -> r2 = Math.max(n + r1, r2)
    for(let n of nums) {
        //using js destructuring to swap the values
        [r1, r2] = [r2, Math.max(n + r1, r2)];
    }

    return r2;
};