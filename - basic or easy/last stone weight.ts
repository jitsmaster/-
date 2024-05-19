import { MaxPriorityQueue } from "@datastructures-js/priority-queue";

/**
 * You are given an array of integers stones where stones[i] is the weight of the ith stone.
 * 
 * We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together.
 * Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is:
 * 
 * - If x == y, both stones are destroyed, and
 * - If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
 * 
 * At the end of the game, there is at most one stone left.
 * 
 * Return the weight of the last remaining stone. If there are no stones left, return 0.
 * 
 * Note: this one was entirely done by myself, without any googling or looking at the solution
 * 
 * @param stones 
 * @returns 
 */
function lastStoneWeight(stones: number[]): number {
	//this is a heap problem, the approach is to use a max heap to store the stones
	//then pop 2 stones at a time, smash them and push back the result, if the result is not 0
	//repeat until there is only 1 stone left, or no stone left.

	//Complexity: 
	//Time: O(nlogn) - for pushing all stones to heap
	//Space: O(n) - for the heap
	const maxPQ = new MaxPriorityQueue<number>();

	//push all stones to pq
	stones.forEach(s => {
		maxPQ.enqueue(s);
	})

	while (maxPQ.size() > 1) {
		//pop 2 out
		const heaviest = maxPQ.dequeue()!;
		const sndHeaviest = maxPQ.dequeue()!;

		const diff = heaviest - sndHeaviest;
		if (diff > 0) {
			maxPQ.enqueue(diff);
		}
	}

	if (maxPQ.size() > 0) {
		return maxPQ.dequeue()!;
	}

	return 0;
};