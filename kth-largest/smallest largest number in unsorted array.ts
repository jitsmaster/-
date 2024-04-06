import { MaxHeap, MinHeap } from "@datastructures-js/heap";

export function findKthLargestNumber(nums: number[], k: number): number {
	//of course, any kth largest/smallest problem on unsorted array just use a heap
	//we use MaxHeap from datastructures-js/heap
	//and dequeue actually happens from the end, which are the largest numbers;

	const heap = new MaxHeap<number>();

	//push all numbers in the queue
	for (const num of nums) {
		heap.push(num);
	}

	console.info(heap.toArray().join(', '));

	//then pop k-1 times
	//priority queue pop remove the front numbers
	while (k > 1) {
		console.info(heap.pop());
		k--;
	}

	return heap.root() as number;
}

export function findKthSmallestNumber(nums: number[], k: number): number {
	//of course, any kth largest/smallest problem on unsorted array just use a heap
	//we use MinHeap from datastructures-js/heap
	//and dequeue actually happens from the end, which are the smallest numbers;

	const heap = new MinHeap<number>();

	//push all numbers in the queue
	for (const num of nums) {
		heap.push(num);
	}

	//then pop k-1 times
	//priority queue pop remove the front numbers
	while (k > 1) {
		heap.pop();
		k--;
	}

	return heap.root() as number;
}