/**
 * Given the head of a linked list, remove the nth node from the end of the list and return its head.

 

Example 1:


Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
Example 2:

Input: head = [1], n = 1
Output: []
Example 3:

Input: head = [1,2], n = 1
Output: [1]
 

Constraints:

The number of nodes in the list is sz.
1 <= sz <= 30
0 <= Node.val <= 100
1 <= n <= sz
 

Follow up: Could you do this in one pass?
 */
//   Definition for singly-linked list.
class ListNode {
	val: number
	next: ListNode | null
	constructor(val?: number, next?: ListNode | null) {
		this.val = (val === undefined ? 0 : val)
		this.next = (next === undefined ? null : next)
	}
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
	//Complexity:
	//Time: O(n) - we are traversing the list with only one pass
	//Space: O(1) - constant space with 2 pointers and new head

	//since it's counting from the end, and linked list is one direction.
	//we don't want to revert the list and revert it back
	//the idea is simple:
	//first have a right pointer move n steps, this makes the left and right pointer exact distance is n
	//now move both them forward together, when the right pointer is null, left pointer will be at the nth node from end
	//then we just remove the left pointer node, by connecting it's previous and next

	//However, instead of having the left at the node to remove, it's better to have it at the previous node
	//in order to do that, we will use a new head to pad one element in front, so the distance between left and right is n + 1
	//This dummy head approach has a lot of benefits:
	//1. It avoids the empty list situation
	//2. It avoids 1st element removed situation
	//3. We don't need to track the previous of left, since the left pointer is previous of current head 

	//at the end, just return the next of new head

	//IMPORTANT NOTE: dummy head is very good approach on linked list
	//especially when we try to remove the item where the pointer is at
	//put the pointer before it making it much easier to understand and perform
	const newHead = new ListNode(0, head)
	let l = newHead;
	let r = l.next;

	//move right pointer n time
	while (n > 0) {
		r = r!.next;
		n--;
	}

	//now move them together, note that left pointer is an item before the item to remove
	while (!!r) {
		[l, r] = [l.next!, r.next];
	}

	//skip the current left node's next item
	l.next = l.next!.next;

	return newHead.next;
};