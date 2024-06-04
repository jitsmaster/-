/**
 * Given the beginning of a singly linked list head, reverse the list, and return the new beginning of the list.
 */

class ListNode {
	val: number;
	next: ListNode | null;

	constructor(val: number, next: ListNode | null = null) {
		this.val = val;
		this.next = next;
	}
}

function reverseList(head: ListNode | null): ListNode | null {
	let prev = null;
	let cur = head;

	while (!!cur) {
		//use simple one line destructuring to swap values
		//this way we don't need to use a temp variable at all
		//and it's slightly faster and more readable
		[cur.next, prev, cur] = [prev, cur, cur.next];
	}

	return prev;
};