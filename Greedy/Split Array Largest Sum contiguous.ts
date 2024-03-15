/**
 * Splits the given array into subarrays such that the maximum sum of any subarray is minimized,
 * and returns the maximum sum.
 * @param nums The array of numbers to split.
 * @param k The number of subarrays to create.
 * @returns The maximum sum of any subarray after splitting.
 */
function splitArray(nums: number[], k: number): number {
    // Binary search approach
    // Time complexity: O(n * log(sum of nums))
    // Space complexity: O(1)

    /**
     * Counts the number of subarrays with a maximum sum less than or equal to the given maxSum.
     * @param maxSum The maximum sum allowed for a subarray.
     * @returns The count of subarrays.
     */
    function countSubarrays(maxSum: number): number {
        let count = 1; // Initialize count to 1 as there is at least one subarray
        let sum = 0; // Initialize sum to 0

        for (const num of nums) {
            // If the sum of the current subarray and the current number is greater than the maximum sum,
            if (sum + num > maxSum) {
                // Restart counting with the current number as sum, and increment the count.
                count++;
                sum = num;
            } else {
                sum += num;
            }
        }

        return count;
    }

    // Initialize left as the maximum number in the array and right as the sum of the array
    let left = Math.max(...nums);
    let right = nums.reduce((a, b) => a + b);

    while (left < right) {
        // Take the middle point
        const mid = Math.floor((left + right) / 2);
        const count = countSubarrays(mid);

        if (count > k) {
            // If the count is greater than k, move the left pointer to the middle
            left = mid + 1;
        } else {
            // If the count is less than or equal to k, move the right pointer to the middle
            right = mid;
        }
    }

    return left; // Return the left pointer as the maximum sum of any subarray after splitting
}
