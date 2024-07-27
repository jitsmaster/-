
/**
 * Given an integer array nums and an integer k, return the kth largest element in the array.
 *
 * Note that it is the kth largest element in the sorted order, not the kth distinct element.
 *
 * Can you solve it without sorting?
 *
 * Example 1:
 *
 * Input: nums = [3,2,1,5,6,4], k = 2
 * Output: 5
 *
 * Example 2:
 *
 * Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
 * Output: 4
 *
 * Constraints:
 *
 * 1 <= k <= nums.length <= 105
 * -104 <= nums[i] <= 104
 */
import java.util.PriorityQueue;

class Solution {

    public int findKthLargest(int[] nums, int k) {
        //Using min heap to sovle the problem.
        //Reason: since we want the kth largest, as long as we pop the head, which is the smallest and maintain the heap
        //in the size of k, the head of the heap will be the smallest in the k size heap, which also means the kth largest.

        //Note: this solution is not the fastest solution, since each heap operation takes logk time, and we are doing n operations
        //the time complexity is O(nlogk), but it is a good solution to solve the problem without sorting the array.
        //We have better solution for the static array scenario, if for running stream, this is the best solution.
        //Complexity: O(nlogk) where n is the number of elements in the array, and k is the size of the heap
        //Space: O(k) we are using a heap to store the k largest elements
        PriorityQueue<Integer> minQueue = new PriorityQueue<>();

        for (int num : nums) {
            minQueue.offer(num);
            if (minQueue.size() > k) {
                minQueue.poll(); //remove the smallest item in the min queue, which is at the front
            }
        }

        //grab the last
        return minQueue.peek();
    }
}
