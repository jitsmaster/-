import { MaxPriorityQueue, MinPriorityQueue } from '@datastructures-js/priority-queue';

function findMedian(sortedArray: number[]): number {
	const minHeap = new MinPriorityQueue<number>();
	const maxHeap = new MaxPriorityQueue<number>();

	for (const num of sortedArray) {
		if (minHeap.size() === maxHeap.size()) {
			maxHeap.enqueue(num);
			minHeap.enqueue(maxHeap.dequeue());
		} else {
			minHeap.enqueue(num);
			maxHeap.enqueue(minHeap.dequeue());
		}
	}

	if (minHeap.size() === maxHeap.size()) {
		return (minHeap.front() + maxHeap.front()) / 2;
	} else {
		return minHeap.front();
	}
}

