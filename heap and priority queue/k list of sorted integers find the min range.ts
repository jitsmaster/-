/**
 * You have K lists of sorted integers. Write a function that finds the smallest range that encompasses at least one
 * number from each of the K lists.
 *
 * This is a popular software engineering interview problem, given by companies such as Google, Amazon, and Facebook.
 * In this episode, we’ll develop a strategy to solve it and then we’ll step through the source code of an actual
 * implementation, written in Java.
 *
 * To put some context for this problem, think of several of your favorite music bands that tour the country. Every
 * now and then they perform in the same city, which of course would be Los Angeles, and the dates of their
 * performances are known in advance. Now, you’d like to schedule your visit to Los Angeles with the goal of seeing
 * at least one performance by each of the bands. But with all the mad traffic, you don’t want to stay there for
 * longer than you have to. So your task is to minimize the date range of being there while still seeing each of the
 * bands.
 *
 * A particularly graceful solution to this problem is to use a priority queue that stores just 1 value from each
 * list. Then when taking a value out from the queue, you put in the next value from the same list. So if you have k
 * lists, there will be at most k numbers in the queue at any given time. We can keep track of the maximum number in
 * the queue in a temporary variable and keep updating it as new values are put in. Since this is a priority queue,
 * when we remove an element, it’ll automatically be the smallest value in the queue. So we can readily check the
 * boundary range between the min and max values as we repeatedly remove and add new values into the queue.
 */

import { MinPriorityQueue } from "@datastructures-js/priority-queue";

/**
 * Finds the minimum range of sorted integers from a list of lists.
 * 
 * @param lists - An array of number arrays representing the lists of sorted integers.
 * @returns A tuple containing the minimum range of sorted integers as [min, max].
 */
export function findMinRange(lists: number[][]): [number, number] {
	//Complexity Analysis:
	//Time complexity: O(n log k) - where k is the number of lists and n is the length of the shortest list, we iterate through the lists once 
	//   and add the smallest number from each list to the priority queue, priority operation is log k
	//Space complexity: O(k) - where k is the number of lists, we store the smallest number from each list in the priority queue

	// Create a priority queue, this is a min priority queue that stores the smallest number from each list
	const pq: MinPriorityQueue<{ value: number, list: number[], curIdx: number }> = new MinPriorityQueue<{ value: number, list: number[], curIdx: number }>(n => n.value);

	// Create a variable to store the max number
	let max = -Infinity;

	// Initialize the minimum range with positive infinity for min and the initial max value
	const minRange: [number, number] = [Infinity, max];

	// Iterate through the lists
	for (let i = 0; i < lists.length; i++) {
		const firstNum = lists[i][0];

		// Add the first number from each list to the priority queue
		pq.enqueue({
			value: firstNum,
			list: lists[i],
			curIdx: 0
		});

		// Update the max number
		max = Math.max(max, firstNum);

		// Update the min number
		minRange[0] = Math.min(firstNum, minRange[0]);
	}

	// Update the max number in the minRange tuple
	minRange[1] = max;

	// Process the priority queue
	while (!!pq.size()) {
		const { value, list, curIdx } = pq.dequeue();

		// If the range of the current list is smaller than the current min range,
		// update the minRange tuple
		if (minRange[1] - minRange[0] > max - value) {
			minRange[0] = value;
			minRange[1] = max;
		}

		const nextIdx = curIdx + 1;

		// If the list has not ended yet,
		// add the next number from the list to the priority queue
		// The smallest number in the priority queue will be the min number on the next dequeue
		if (nextIdx < list.length) {
			const nextNum = list[nextIdx];
			pq.enqueue({
				value: nextNum,
				list: list,
				curIdx: nextIdx
			});
			//only need to update the max value, since the pq is in charge of the min value
			max = Math.max(max, nextNum);
		} else {
			break; // Break on the first list that ends, as the range will only increase from here
		}
	}

	return minRange; // Return the minimum range of sorted integers as [min, max]
}