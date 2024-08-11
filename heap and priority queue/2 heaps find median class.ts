import { MaxPriorityQueue, MinPriorityQueue } from "@datastructures-js/priority-queue";

/**
 * const { PriorityQueue, MaxPriorityQueue, MinPriorityQueue } = require('@datastructures-js/priority-queue');
 */

class MedianFinder {
	//The idea is to use two heaps to store the lower half and the higher half of the input stream
	//and the median will be the top of the heap with the most elements, or the average of the two tops if they have the same size
	//the reason we are having the maxheap or small and minheap for large, is to get the top value for the median
	//maxheap top is the biggest value, minheap top is the smallest value
	//pick or average will be just he median

	//IMPORTANT: the 2 heaps must be same size or differ by 1, so we need to balance them
	//if the size of the 2 heaps differ by 2, we need to move the top of the bigger heap to the smaller heap
	//to make sure they differ by 1
	small = new MaxPriorityQueue<number>();
	large = new MinPriorityQueue<number>();

	constructor() { }

	addNum(num: number) {
		//Complexity:
		//Time: O(log n), for the heapify operation
		//Space: O(n), the size of the heap

		// if minheap has no element, add to it first
		// or if the number if bigger than the minheap top, add to the minheap
		if (this.large.isEmpty() || num > this.large.front()) {
			this.large.enqueue(num);
		} else {
			this.small.enqueue(num);
		}

		// Balance the heaps to make sure their sizes differ by no more than 1
		if (this.small.size() > this.large.size() + 1) {
			this.large.enqueue(this.small.dequeue());
		} else if (this.large.size() > this.small.size() + 1) {
			this.small.enqueue(this.large.dequeue());
		}
	}

	findMedian(): number {
		//Complexity: 
		//Time: O(1) - getting the top of the heap
		//Space: O(n) - the size of the heap

		//take the top of bigger heap
		if (this.small.size() > this.large.size()) {
			return this.small.front();
		} else if (this.large.size() > this.small.size()) {
			return this.large.front();
		} else {
			// If both heaps are of the same size, the median is the average of the two heap tops
			return (this.small.front() + this.large.front()) / 2.0;
		}
	}
}
