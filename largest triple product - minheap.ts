import { MinHeap } from "./Support/Heaps";


function findMaxProduct(arr: number[]): number[] {
	/**
	 * Complexity Information:
	 * 
	 * Time Complexity: The time complexity of this code is O(n log k), 
	 * where n is the number of elements in the input array and k is the size of the heap. 
	 * The loop iterates over each element in the array, and for each iteration, it performs heap operations such as push and pop, 
	 * which have a time complexity of O(log k). Since the size of the heap is at most 3, the time complexity can be considered as O(n).
	 * 
	 * Space Complexity: The space complexity of this code is O(k), where k is the size of the heap.
	 * The heap stores the largest three elements at any given time, so the space required is proportional to the size of the heap.
	 * The code uses a MinHeap data structure to efficiently find the largest triple product in the input array. 
	 * It maintains a heap of the largest three elements encountered so far, and for each new element, 
	 * it calculates the product of the three largest elements and stores it in the result array. 
	 * The popped elements are then pushed back into the heap to maintain the original order.
	 */
	const result: number[] = [];
	const heap = new MinHeap();

	for (let i = 0; i < arr.length; i++) {
		heap.push(arr[i]);
		if (i < 2) {
			result.push(-1);
		} else {
			//pop out 3 largest elements, and push them back in
			const largest = heap.pop()!;
			const secondLargest = heap.pop()!;
			const thirdLargest = heap.pop()!;
			result.push(largest * secondLargest * thirdLargest);
			heap.push(largest);
			heap.push(secondLargest);
			heap.push(thirdLargest);
		}
	}

	return result;
}
