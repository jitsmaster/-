import { MaxPriorityQueue, MinPriorityQueue } from "@datastructures-js/priority-queue";

class MedianFinder {
	private maxHeap = new MaxPriorityQueue<number>();
	private minHeap = new MinPriorityQueue<number>();

	constructor() {
	}

	addNum(num: number): void {
		// Time Complexity: O(logn) - to enqueue the number in the heaps
		// Space Complexity: O(n) - used to store the elements in the heaps

		// flow: 
		// 1. if the maxHeap is empty or the number is less than the maxHeap's front, enqueue the number in the maxHeap,
		// 	  else enqueue the number in the minHeap
		// reason: we want to maintain the maxHeap as the heap with the smaller elements
		if (!this.maxHeap.isEmpty() || num >= this.maxHeap.front()) {
			this.minHeap.enqueue(num);
		} else {
			this.maxHeap.enqueue(num);
		}

		// 2. if the maxHeap has more elements than the minHeap, dequeue the front of the maxHeap and 
		// enqueue it in the minHeap
		// else if the minHeap has more elements than the maxHeap, dequeue the front of the minHeap and
		// enqueue it in the maxHeap
		// reason: we want to maintain the size of the maxHeap to be equal to or 1 more than the minHeap
		if (Math.abs(this.maxHeap.size() - this.minHeap.size()) > 1) {
			if (this.maxHeap.size() > this.minHeap.size() + 1) {
				this.minHeap.enqueue(this.maxHeap.dequeue());
			} else {
				this.maxHeap.enqueue(this.minHeap.dequeue());
			}
		}
	}

	findMedian(): number {
		if (this.maxHeap.size() === this.minHeap.size()) {
			return (this.maxHeap.front() + this.minHeap.front()) / 2;
		} else {
			const biggerHeap = this.maxHeap.size() > this.minHeap.size() ?
				this.maxHeap : this.minHeap;
			return biggerHeap.front();
		}
	}
}