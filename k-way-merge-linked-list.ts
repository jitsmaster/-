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
	//Use priority queue to store the heads of the linked lists,
	//the priority queue will be min heap based on the value of the node
	const minPQ = new MinPriorityQueue<ListNode | null>(node => node?.val || 0);

	// Add all the heads of the linked lists to the queue
	for (let i = 0; i < lists.length; i++) {
		if (!!lists[i]) {
			minPQ.enqueue(lists[i]);
		}
	}

	let dummy = new ListNode();
	let tail = dummy;

	// Perform k-way merge
	while (!minPQ.isEmpty()) {
		const element = minPQ.dequeue();
		tail.next = element;
		tail = tail.next!;

		if (!!tail.next) {
			minPQ.enqueue(tail.next);
		}
	}

	return dummy.next;
}

function merge2SortedLinkedList(l1: ListNode | null, l2: ListNode | null): ListNode | null {
	//in case either of the list is empty, return the other list
	if (!l1) return l2;
	if (!l2) return l1;

	let dummy = new ListNode();
	let tail = dummy;

	// Perform merge of 2 sorted linked lists both exist
	while (l1 && l2) {
		if (l1.val < l2.val) {
			//list 1 value is smaller, add it to the tail
			tail.next = l1;
			//move l1 pointer to the next node
			l1 = l1.next;
		} else {
			//list 2 value is smaller, add it to the tail
			tail.next = l2;
			//move l2 pointer to the next node
			l2 = l2.next;
		}

		//move the new list node tail to the next node
		tail = tail.next;
	}

	//if either of the list has remaining nodes, add them to the tail
	tail.next = l1 || l2;

	return dummy.next;
}