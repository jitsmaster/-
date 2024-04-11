import { MaxPriorityQueue } from "@datastructures-js/priority-queue";

function balancedSplitExists(arr: number[]) {
	//odd array can't be balanced
	if (arr.length % 2 !== 0) return false;

	const totalSum = arr.reduce((acc, cur) => acc + cur, 0);

	//odd total can't be balanced
	if (totalSum % 2 == 1) return false;

	//now sort the array,
	//out approach is to check left sum against right sum,
	//left sum increment, right sum decrement,
	//check if that given moment, left sum is equal to right sum
	//greedy approach, we sort array first, so we will start moving from the smallest number
	arr.sort((a, b) => a - b);

	let leftSum = 0;
	let rightSum = totalSum;

	//it's sort of 2 pointers approach, except we don't just use 2 pointers
	//also 2 arrays, one for left and one for right

	let leftArr = [] as number[]
	let rightArr = [...arr];

	let canSplit = false;

	//iterate through the array
	for (let num of arr) {
		//we move the pointers on both ends,
		//can same time move items from right array to left array
		leftSum += num;
		leftArr.push(num);
		rightSum -= num;
		rightArr.shift();
		//if left sum is equal to right sum, we can see if the left array contains any item from right away
		if (leftSum === rightSum) {
			//now make sure nothing in left array is in right array
			if (!leftArr.some((num) => rightArr.includes(num))) {
				canSplit = true;
				break;
			}
		}
	}

	return canSplit;
}

function balancedSplitExistsWithHeap(arr: number[]) {
	const total = arr.reduce((acc, cur) => acc + cur, 0);
	//odd total can't be balanced
	if (total % 2 !== 0) return false;

	//we will use a max heap to store the numbers
	//naturally sorting it in ascending order
	//sort of greedy approach too.
	//since the idea is we add up smaller numbers to see if can use them to balance the larger numbers
	const maxHeap = new MaxPriorityQueue<number>();

	//add all the numbers to the max heap
	for (let num of arr) {
		maxHeap.enqueue(num);
	}

	//pop it one by one, and add to the left sum
	let leftSum = 0;
	let rightSum = total;

	while (maxHeap.size() > 0) {
		//we no longer need to sort the array
		//or use 2 arrays
		//just popping from the max heap one by one
		let num = maxHeap.dequeue() as number;
		leftSum += num;
		rightSum -= num;
		if (leftSum === rightSum) {
			return true;
		}
	}
}
