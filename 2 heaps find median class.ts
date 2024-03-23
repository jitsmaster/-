import { MinPriorityQueue, MaxPriorityQueue } from "@datastructures-js/priority-queue";

class MedianFinder {
    private maxHeap = new MaxPriorityQueue<number>();
    private minHeap = new MinPriorityQueue<number>();

    constructor() {
    }

    addNum(num: number): void {
        if (this.maxHeap.size() === 0 || num < this.maxHeap.front()) {
            this.maxHeap.enqueue(num);
        } else {
            this.minHeap.enqueue(num);
        }

        if (this.maxHeap.size() > this.minHeap.size() + 1) {
            this.minHeap.enqueue(this.maxHeap.dequeue());
        } else if (this.minHeap.size() > this.maxHeap.size()) {
            this.maxHeap.enqueue(this.minHeap.dequeue());
        }
    }

    findMedian(): number {
        if (this.maxHeap.size() === this.minHeap.size()) {
            return (this.maxHeap.front() + this.minHeap.front()) / 2;
        } else {
            return this.maxHeap.front();
        }
    }
}