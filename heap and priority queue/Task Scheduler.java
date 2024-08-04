
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Queue;

/**
 * You are given an array of CPU tasks, each represented by letters A to Z, and
 * a cooling time, n. Each cycle or interval allows the completion of one task.
 * Tasks can be completed in any order, but there's a constraint: identical
 * tasks must be separated by at least n intervals due to cooling time. Return
 * the minimum number of intervals required to complete all tasks.
 *
 * Example 1:
 *
 * Input: tasks = ["A","A","A","B","B","B"], n = 2 Output: 8 Explanation: A
 * possible sequence is: A -> B -> idle -> A -> B -> idle -> A -> B. After
 * completing task A, you must wait two cycles before doing A again. The same
 * applies to task B. In the 3rd interval, neither A nor B can be done, so you
 * idle. By the 4th cycle, you can do A again as 2 intervals have passed.
 *
 * Example 2:
 *
 * Input: tasks = ["A","C","A","B","D","B"], n = 1 Output: 6 Explanation: A
 * possible sequence is: A -> B -> C -> D -> A -> B. With a cooling interval of
 * 1, you can repeat a task after just one other task.
 *
 * Example 3:
 *
 * Input: tasks = ["A","A","A", "B","B","B"], n = 3 Output: 10 Explanation: A
 * possible sequence is: A -> B -> idle -> idle -> A -> B -> idle -> idle -> A
 * -> B. There are only two types of tasks, A and B, which need to be separated
 * by 3 intervals. This leads to idling twice between repetitions of these
 * tasks.
 *
 * Constraints: 1 <= tasks.length <= 104 tasks[i] is an uppercase English
 * letter. 0 <= n <= 100
 */
class Solution {

    public int leastInterval(char[] tasks, int n) {
        //Analysis:
        //The idea is to use a max heap to store the count of each character
        //Then we use a queue to store the delayed tasks
        //In each iteration, we first check the queue to see if any task can be pushed to the heap
        //Then we pop the heap to get the task to be executed
        //If the count is not zero, we push it to the queue for later use
        //We keep track of the time and return it at the end

        //Complexity:
        //The time complexity is O(n) where n is the number of tasks, it should n * m (m is idle cycles), but m is limited to a range, or not counted here
        //The space complexity is O(n) where n is the number of tasks
        //first genetate a map of count by character
        Map<Character, Integer> map = new HashMap<>();

        //find the count of a character
        for (char c : tasks) {
            map.put(c, map.getOrDefault(c, 0) + 1);
        }

        //create a max heap to store the count of each character
        PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder());
        heap.addAll(map.values());

        //create a queue for delayed tasks
        // Deque<int[]> queue = new ArrayDeque<>();
        Queue<int[]> queue = new LinkedList<>();

        int time = 0;

        //iterate through the max count
        while (!heap.isEmpty() || !queue.isEmpty()) {

            //IMPORTANT: first to check the queue to see if anything can be pushed to heap
            if (!queue.isEmpty() && time >= queue.peek()[1]) {
                heap.offer(queue.poll()[0]);
            }

            //then pop the heap
            if (!heap.isEmpty()) {
                int count = heap.poll() - 1;
                //if the count is not zero, push it to the queue, for later use
                if (count > 0) {
                    queue.offer(new int[]{count, time + n + 1});
                }
            }

            time++;
        }

        return time;
    }
}
