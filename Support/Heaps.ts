export class MaxHeap {
	heap: number[] = [];
	constructor() {
	}

	// Helper Methods
	getLeftChildIndex(parentIndex: number) {
		return 2 * parentIndex + 1;
	}
	getRightChildIndex(parentIndex: number) {
		return 2 * parentIndex + 2;
	}
	getParentIndex(childIndex: number) {
		return Math.floor((childIndex - 1) / 2);
	}
	hasLeftChild(index: number) {
		return this.getLeftChildIndex(index) < this.heap.length;
	}
	hasRightChild(index: number) {
		return this.getRightChildIndex(index) < this.heap.length;
	}
	hasParent(index: number) {
		return this.getParentIndex(index) >= 0;
	}
	leftChild(index: number) {
		return this.heap[this.getLeftChildIndex(index)];
	}
	rightChild(index: number) {
		return this.heap[this.getRightChildIndex(index)];
	}
	parent(index: number) {
		return this.heap[this.getParentIndex(index)];
	}

	// Functions to create Min Heap

	swap(indexOne: number, indexTwo: number) {
		const temp = this.heap[indexOne];
		this.heap[indexOne] = this.heap[indexTwo];
		this.heap[indexTwo] = temp;
	}

	peek() {
		if (this.heap.length === 0) {
			return Number.MAX_VALUE;
		}
		return this.heap[0];
	}

	get size() {
		return this.heap.length;
	}

	// Removing an element will remove the
	// top element with highest priority then
	// heapifyDown will be called 
	pop() {
		if (this.heap.length === 0) {
			return null;
		}
		const item = this.heap[0];
		this.heap[0] = this.heap[this.heap.length - 1];
		this.heap.pop();
		this.heapifyDown();
		return item;
	}

	push(item: number) {
		this.heap.push(item);
		this.heapifyUp();
	}

	heapifyUp() {
		let index = this.heap.length - 1;
		while (this.hasParent(index) && this.parent(index) > this.heap[index]) {
			this.swap(this.getParentIndex(index), index);
			index = this.getParentIndex(index);
		}
	}

	heapifyDown() {
		let index = 0;
		while (this.hasLeftChild(index)) {
			let smallerChildIndex = this.getLeftChildIndex(index);
			if (this.hasRightChild(index) && this.rightChild(index) < this.leftChild(index)) {
				smallerChildIndex = this.getRightChildIndex(index);
			}
			if (this.heap[index] < this.heap[smallerChildIndex]) {
				break;
			} else {
				this.swap(index, smallerChildIndex);
			}
			index = smallerChildIndex;
		}
	}

	printHeap() {
		var heap = ` ${this.heap[0]} `
		for (var i = 1; i < this.heap.length; i++) {
			heap += ` ${this.heap[i]} `;
		}
		console.log(heap);
	}
}

export class MinHeap {
	heap: number[] = [];
	constructor() {
	}

	getParentIndex(index: number) {
		return Math.floor((index - 1) / 2);
	}

	getLeftChildIndex(index: number) {
		return 2 * index + 1;
	}

	getRightChildIndex(index: number) {
		return 2 * index + 2;
	}

	swap(index1: number, index2: number) {
		[this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
	}

	peek() {
		if (this.heap.length === 0) {
			return Number.MIN_VALUE;
		}
		return this.heap[0];
	}

	push(value: number) {
		this.heap.push(value);
		this.heapifyUp();
	}

	heapifyUp() {
		let index = this.heap.length - 1;
		while (index > 0 && this.heap[index] > this.heap[this.getParentIndex(index)]) {
			const parentIndex = this.getParentIndex(index);
			this.swap(index, parentIndex);
			index = parentIndex;
		}
	}

	get size() {
		return this.heap.length;
	}


	pop() {
		if (this.heap.length === 0) {
			return null;
		}

		const max = this.heap[0];
		this.heap[0] = this.heap.pop() as number;
		this.heapifyDown();
		return max;
	}

	heapifyDown() {
		let index = 0;
		while (this.getLeftChildIndex(index) < this.heap.length) {
			const leftChildIndex = this.getLeftChildIndex(index);
			const rightChildIndex = this.getRightChildIndex(index);
			const largerChildIndex =
				rightChildIndex < this.heap.length && this.heap[rightChildIndex] > this.heap[leftChildIndex]
					? rightChildIndex
					: leftChildIndex;

			if (this.heap[index] >= this.heap[largerChildIndex]) {
				break;
			}

			this.swap(index, largerChildIndex);
			index = largerChildIndex;
		}
	}
}

