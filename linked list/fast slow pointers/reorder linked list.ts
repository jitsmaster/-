

/**
 * You are given the head of a singly linked-list. The list can be represented as:
 * L0 → L1 → … → Ln - 1 → Ln
 * Reorder the list to be on the following form:
 * L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
 * You may not modify the values in the list's nodes. Only nodes themselves may be changed.
 * 
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

//  Definition for singly-linked list.
class ListNode {
	val: number
	next: ListNode | null
	constructor(val?: number, next?: ListNode | null) {
		this.val = (val === undefined ? 0 : val)
		this.next = (next === undefined ? null : next)
	}
}

/**
 Do not return anything, modify head in-place instead.
 */
function reorderList(head: ListNode | null): void {
	//Complexity:
	//Time: O(n) - 3 loops, 1 to find the middle, 1 to reverse, 1 to merge
	//Space: O(1) - constant space with 4 pointers

	//Analysis:
	//The approach is to cut the list in half, reverse the 2nd half, and merge the 2 halves
	//Import part is to cut off the end of the first half, otherwise the 2 halves will be overlapping at some point, causing circular linked list
	if (!head) return;

	//first use fast slow pointer to divide the linked list in half,
	//if add numbers, the first half will be one element longer
	let slow = head;
	let fast = head.next;

	//loop until fast reach the end or outside the list
	while (!!fast && !!fast.next) {
		slow = slow.next!;
		fast = fast.next.next;
	}

	//the 2nd half is the next of slow end
	let second = slow.next;
	let prev = null;
	//MOST IMPORTANT PART, make sure to cut of the end of first half
	//otherwise the 2 halve will be overlapping, the intermixing will have loops!
	slow.next = null;

	//reverse the linked list, using swapping
	while (second) {
		//the second's next points to previous,
		//and move pointer of sound to second.next
		//also, prev is assigned to second, used to assign to next's next
		[second.next, second, prev] = [prev, second.next, second]
	}

	//now prev will be the actual second

	//time to merge
	//we know the second is same or shorter, so just count the second half
	while (!!prev) {
		//head 1's next point to head 2 (the old end of second)
		//head 2's next point to the original next of head 1;
		//the link is connected
		//and then move forward, head 1 point to head 1's original next, and head 2 point to head 2's 
		//original next (original original previous)
		[head!.next, prev.next, head, prev] = [prev, head!.next, head!.next, prev.next]
	}
};