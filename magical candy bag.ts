import { MinHeap } from "./Support/Heaps";

function maxCandies(arr: number[], k: number): number {
	//approach: 1. use a min heap to store the candies
	//          2. iterate through the heap, and add the candies to the result
	//          3. return the result
	const heap = new MinHeap();

	//add all the candies to heap first, the biggest one will come on top
	//this naturally sorts the candies in descending order
	arr.forEach(candy => heap.push(candy));

	let candiesEaten = 0;

	while (k > 0) {
		//add the current bag to the heap
		const max = heap.pop() as number;
		candiesEaten += max;

		//now we add a new entry to the heap, which is the max / 2's floor value
		//for consideration of next round
		heap.push(Math.floor(max / 2));
		k--;
	}

	return candiesEaten;

}

