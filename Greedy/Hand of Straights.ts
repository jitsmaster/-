import { MinPriorityQueue } from "@datastructures-js/priority-queue";

/**
 * Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size
 * groupSize, and consists of groupSize consecutive cards.
 *
 * Given an integer array hand where hand[i] is the value written on the ith card and an integer groupSize, return
 * true if she can rearrange the cards, or false otherwise.
 *
 * Example 1:
 *
 * Input: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
 * Output: true
 * Explanation: Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]
 *
 * Example 2:
 *
 * Input: hand = [1,2,3,4,5], groupSize = 4
 * Output: false
 * Explanation: Alice's hand can not be rearranged into groups of 4.
 *
 * Constraints:
 *
 * 1 <= hand.length <= 104
 * 0 <= hand[i] <= 109
 * 1 <= groupSize <= hand.length
 *
 * Note: This question is the same as 1296: https://leetcode.com/problems/divide-array-in-sets-of-k-consecutive-numbers/
 */
function isNStraightHand(hand: number[], groupSize: number): boolean {
	//Analysis:
	//This is a greedy solution, the greedy part is we always need to start the group from the smallest number
	//so using a min heap to keep track of the smallest number

	//Complexity Analysis:
	//Time complexity: O(n log n), we are using a heap to sort the numbers, and we loop through the numbers
	//Space complexity: O(n), we are using a map and heap to keep track of the counts of the numbers

	if (hand.length % groupSize !== 0)
		return false;


	//first, group numbers together and create a map of count
	const countsByNumber = hand
		.reduce((acc, cur) => {
			if (!acc.has(cur)) {
				acc.set(cur, 0);
			}

			acc.set(cur, acc.get(cur)! + 1);

			return acc;
		}, new Map<number, number>());

	const minHeap = new MinPriorityQueue<number>();

	for (let i of countsByNumber.keys()) {
		minHeap.enqueue(i);
	}


	//based on group size, start to group numbers together
	//we will stop grouping when the min heap is running out of numbers
	while (minHeap.size()) {
		const start = minHeap.front();
		for (let i = 0; i < groupSize; i++) {
			const num = start + i;
			const count = countsByNumber.get(num) ?? 0;
			//first fail case, running out of the count for this number
			//or just number doesn't exist in hand at all
			if (!count)
				return false;

			const newCount = count - 1;
			countsByNumber.set(num, newCount);

			if (newCount === 0) {
				//second fail case, the number is not the smallest value in min heap
				//when the count is 0. That means we cannot find that next consecutive number for this group
				if (num !== minHeap.front())
					return false

				minHeap.dequeue(); //remove the smallest number in min heap, which should also be the current number
			}
		}
	}

	return true;
}
