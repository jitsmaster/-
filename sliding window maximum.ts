import { Deque } from "@datastructures-js/deque";

export function slidingWindowMax(nums: number[], k: number): number[] {
    //Algorithm: Monotonic Queue, or double ended queue
    //Time complexity: O(n)
    //Space complexity: O(k)

    //The algorithm uses a double ended queue to store the indices of the elements in the current window.
    //It iterates over the input array nums using a for loop.
    //Remove elements from the front of the deque that are out of the current window
    //Remove elements from the back of the deque that are smaller than the current element
    //Add the current element to the deque
    //Add the maximum element in the current window to the result
    //Return the result array
    
    const result: number[] = [];

    //create a double ended queue
    //it will store the indices of the elements in the current window
    //the elements in the deque are in decreasing order
    //the first element of the deque is the index of the maximum element in the current window
    //the last element of the deque is the index of the minimum element in the current window
    const deque: Deque<number> = new Deque<number>();

    // It iterates over the input array nums using a for loop.

    for (let i = 0; i < nums.length; i++) {
        // Remove elements from the front of the deque that are out of the current window
        if (deque.size() > 0 && deque.front() === i - k) {
            deque.popFront();
        }

        // Remove elements from the back of the deque that are smaller than the current element
        while (deque.size() > 0 && nums[deque.back()] < nums[i]) {
            deque.popBack();
        }

        // Add the current element to the deque
        deque.pushBack(i);

        // Add the maximum element in the current window to the result
        if (i >= k - 1) {
            result.push(nums[deque.front()]);
        }
    }

    return result;
}
