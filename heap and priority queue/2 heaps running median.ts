import { MaxPriorityQueue, MinPriorityQueue } from '@datastructures-js/priority-queue';

export function runningMedian(a: number[]): number[] {
	const minQ = new MinPriorityQueue<number>();
	const maxQ = new MaxPriorityQueue<number>();

	const result: number[] = [];

	for (const n of a) {
		if (!maxQ.isEmpty() && n >= maxQ.front()) {
			minQ.enqueue(n);
		} else {
			maxQ.enqueue(n);
		}

		if (Math.abs(minQ.size() - maxQ.size()) > 1) {
			if (maxQ.size() > minQ.size()) {
				minQ.enqueue(maxQ.dequeue());
			} else {
				maxQ.enqueue(minQ.dequeue());
			}
		}

		if (minQ.size() === maxQ.size()) {
			//evenly sized, so the median is the average of the top of the two heaps
			result.push((minQ.front() + maxQ.front()) / 2);
		} else {
			//oddly sized, so the median is the top of the bigger heap
			const biggerQ = maxQ.size() > minQ.size() ? maxQ : minQ;
			result.push(biggerQ.front());
		}
	}

	return result;
}
