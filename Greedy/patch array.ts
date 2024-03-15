function minPatches(nums: number[], n: number): number {
    // The problem is to find the minimum number of patches required to make the array permutation sums
    // contain all numbers from 1 to n.

    // We can use a greedy approach to solve this problem.
    // The idea is to iterate through the array and keep track of the sum of numbers we can cover so far.
    // If the current number is less than or equal to the sum + 1, we can cover it by adding it to the sum.
    // If the current number is greater than the sum + 1, we need to add a patch to the array.
    // We increment the sum by sum + 1, as we can cover all numbers from 1 to sum by adding sum to the array.
    // In this scenario, we have to add a patch to the array.

    // The time complexity of this approach is O(logn), as we iterate through the array and double the sum in each iteration.
    // The space complexity is O(1), as we only use a constant amount of extra space.

    let patches = 0;
    let i = 0;
    let sum = 0;

    // Loop until the sum is equal or greater than the target sum.
    while (sum < n) {
        if (i < nums.length && nums[i] <= sum + 1) {
            // If the index is less than the length of the array and the current number is less than or equal to the sum + 1,
            // we can cover the current number by adding it to the sum.
            sum += nums[i];
            i++;
        } else {
            // If the current number is greater than the sum + 1, we need to add a patch to the array.
            // Increment the sum by sum + 1 and add a patch.
            sum += sum + 1;
            patches++;
        }
    }

    return patches;
};