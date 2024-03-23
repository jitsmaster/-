import { MaxPriorityQueue, MinPriorityQueue } from "@datastructures-js/priority-queue";

export function findMedianWithHeaps(sortedArray: number[]) : number {
	const minHeap = new MinPriorityQueue<number>();
	const maxHeap = new MaxPriorityQueue<number>();

	for (const num of sortedArray) {
		//if the 2 heaps have the same size, we add the number to the maxHeap
		//than pop up the smallest number from maxHeap and add it to minHeap
		//this will make sure we always have the biggest numbers in minHeap
		if (minHeap.size === maxHeap.size) {
			maxHeap.enqueue(num);
			minHeap.enqueue(maxHeap.dequeue());
		} else {
			//if the 2 heaps have different size, we add the number to the minHeap
			//than pop up the biggest number from minHeap and add it to maxHeap
			//this will make sure we always have the smallest numbers in maxHeap
			minHeap.enqueue(num);
			maxHeap.enqueue(minHeap.dequeue());
		}
	}

	//if the 2 heaps have the same size, we return the average of the 2 top numbers
	//otherwise, we just need to return the max of min heap
	if (minHeap.size === maxHeap.size) {
		return (minHeap.front() + maxHeap.front()) / 2;
	} else {
		return minHeap.front();
	}
}
