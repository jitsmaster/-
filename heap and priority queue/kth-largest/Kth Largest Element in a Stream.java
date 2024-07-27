
import java.util.PriorityQueue;

/**
 * Design a class to find the kth largest element in a stream. Note that it is
 * the kth largest element in the sorted order, not the kth distinct element.
 *
 * Implement KthLargest class:
 *
 * KthLargest(int k, int[] nums) Initializes the object with the integer k and
 * the stream of integers nums. int add(int val) Appends the integer val to the
 * stream and returns the element representing the kth largest element in the
 * stream.
 *
 * Example 1:
 *
 * Input ["KthLargest", "add", "add", "add", "add", "add"] [[3, [4, 5, 8, 2]],
 * [3], [5], [10], [9], [4]] Output [null, 4, 5, 5, 8, 8]
 *
 * Explanation KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
 * kthLargest.add(3); // return 4 kthLargest.add(5); // return 5
 * kthLargest.add(10); // return 5 kthLargest.add(9); // return 8
 * kthLargest.add(4); // return 8
 *
 * Constraints:
 *
 * 1 <= k <= 104 0 <= nums.length <= 104 -104 <= nums[i] <= 104 -104 <= val <=
 * 104 At most 104 calls will be made to add. It is guaranteed that there will
 * be at least k elements in the array when you search for the kth element.
 */
class KthLargest {
    //Analysis: this is a problem we can resolve with min heap
    //As long as we cap the min heap at size of k, we will always have the kth largest element at the front of the heap

    //Complexity:
    //Time: O(nlogk) where n is the number of elements in the stream, and k is the size of the heap, 
    //we are adding n elements to the heap, and each add operation takes logk time for heap sort
    //Space: O(k) we are using a heap to store the k largest elements
    int k;
    PriorityQueue<Integer> minHeap;

    public KthLargest(int k, int[] nums) {
        minHeap = new PriorityQueue<>();

        for (int num : nums) {
            add(num);
        }
    }

    public int add(int val) {
        minHeap.offer(val);
        if (minHeap.size() > k) {
            minHeap.poll();
        }
        return minHeap.peek(); //peek at the front of the queue, default priority queue is min heap, smaller element at the front
    }
}
