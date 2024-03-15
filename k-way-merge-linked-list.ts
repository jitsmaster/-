import {MinPriorityQueue } from "@datastructures-js/priority-queue";

 class ListNode {
         val: number
         next: ListNode | null
         constructor(val?: number, next?: ListNode | null) {
             this.val = (val===undefined ? 0 : val)
             this.next = (next===undefined ? null : next)
         }
     }

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
	const queue = new MinPriorityQueue<ListNode | null>(node => node?.val || 0);

	// Add all the heads of the linked lists to the queue
	for (let i = 0; i < lists.length; i++) {
		if (!!lists[i]) {
			queue.enqueue(lists[i]);
		}
	}

	let dummy = new ListNode();
	let tail = dummy;

	// Perform k-way merge
	while (!queue.isEmpty()) {
		const element = queue.dequeue();
		tail.next = element;
		tail = tail.next!;

		if (!!tail.next) {
			queue.enqueue(tail.next);
		}
	}

	return dummy.next;
}