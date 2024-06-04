/**
 * A queue that is always in decreasing order.
 * Monotonic queues are used in problems where you need to find the maximum or minimum element in a sliding window.
 */
export class MonotonicDecreasingQueue<T> {
	private queue: { priority: number, value: T }[] = [];

	constructor() {
	}

	enqueue(newValue: T, newValuePriority: number): void {
		//remove all elements with lower priority
		//and push the new element at the end
		//this will make sure the queue is always in decreasing order.
		//also, no dupe, so must be <= instead of <
		while (this.queue.length > 0
			&& this.queue[this.queue.length - 1].priority <= newValuePriority) {
			this.queue.pop();
		}
		this.queue.push({ value: newValue, priority: newValuePriority });
	}

	dequeue(): T | undefined {
		//as a queue, the result comes from the front
		return this.queue.shift()?.value;
	}

	peek(): T | undefined {
		//as a queue, the result comes from the front
		return this.queue[0]?.value;
	}

	get size(): number {
		return this.queue.length;
	}
}