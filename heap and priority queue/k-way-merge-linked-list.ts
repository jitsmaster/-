import { MinPriorityQueue } from "@datastructures-js/priority-queue";

class ListNode {
	val: number
	next: ListNode | null
	constructor(val?: number, next?: ListNode | null) {
		this.val = (val === undefined ? 0 : val)
		this.next = (next === undefined ? null : next)
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
	//Analysis: O(n + m) time complexity, since we only advance one list at a time
	//Space complexity is O(n  + m), new linked linked list holds elements from both list

	//in case either of the list is empty, return the other list
	if (!l1) return l2;
	if (!l2) return l1;

	let newHeadPrefix = new ListNode();
	let tail = newHeadPrefix;

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

	return newHeadPrefix.next;
}

function merge2SortedLinkedListFast(list1: ListNode | null, list2: ListNode | null): ListNode | null {
	//Analysis: Instead of O(n + m) time complexity, we can achieve O(max(n, m)) time complexity
	//Space complexity is O(n  + m), new linked linked list holds elements from both list

	//We use list1 as the based of merged list, and insert nodes from list2 into merged
	//when found list2 node is smaller than list1 node.
	//This way, the smaller list2 node is inserted infront of the list1 node, and we advancing both merged list and list2 in the same time,
	//effectily reduce the time on advancing the shorter list.

	//So closer the size of 2 lists, the faster the merge will be

	let preHead = new ListNode(0)
	let mergedTail = preHead
	mergedTail.next = list1;

	let otherList = list2;

	while (otherList !== null) {
		if (mergedTail.next === null || mergedTail.next.val > otherList.val) {
			//if we find that the other list node is smaller than the current merged list node
			const newNode = new ListNode(otherList.val);
			//add the new node infront of the current merged list next node;
			//the process is:
			//newNode.next takes the original merged tail next;
			//mergedTail.next takes the new node (advancing the merged list)
			//also, otherList advances to the next node
			//this is the step that saves time, since we are advancing both merged and other list in the same time, 
			//instead of one after another
			[newNode.next, mergedTail.next, otherList] = [mergedTail.next, newNode, otherList.next];
		} else {
			//if the other list node is not smaller, advance the merged list directly
			mergedTail = mergedTail.next
		}
	}

	return preHead.next
};