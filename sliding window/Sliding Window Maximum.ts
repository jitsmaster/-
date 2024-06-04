/**
 * You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array 
 * to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.
 * 
 * Return the max sliding window.
 */

import { MonotonicDecreasingQueue } from "../Support/MonotonicDescreasingQueue";


function maxSlidingWindow(nums: number[], k: number): number[] {
	//monotonic decrease queue to be used to come out with the max element in the window
	//much faster than max of every element in the window
	//this deque compares with element value, but stores index

	//initialize the queue
	const deque = new MonotonicDecreasingQueue<number>();
	const result: number[] = [];

	//initialize the queue with the first k elements
	for (let i = 0; i < k; i++) {
		deque.enqueue(i, nums[i]);
	}

	//top of the queue is always the max element in the window
	result.push(nums[deque.peek()!]);

	//iterate through rest of the array
	for (let i = k; i < nums.length; i++) {

		//if the window has moved past the first element of the window
		if (deque.size && deque.peek() === i - k) {
			deque.dequeue();
		}

		//if the queue is not empty and the last element of the queue is less than the current element
		//we remove the last element from the queue
		//add the current element to the queue
		deque.enqueue(i, nums[i]);


		//if the window has reached the size of k
		result.push(nums[deque.peek()!]);
	}

	return result;

}