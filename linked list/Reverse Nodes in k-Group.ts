/**
 * Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.
 * 
 * k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.
 * 
 * You may not alter the values in the list's nodes, only nodes themselves may be changed.
 * 
 * Example 1:
 * 
 * Input: head = [1,2,3,4,5], k = 2
 * Output: [2,1,4,3,5]
 * 
 * Example 2:
 * 
 * Input: head = [1,2,3,4,5], k = 3
 * Output: [3,2,1,4,5]
 * 
 * Constraints:
 * 
 * The number of nodes in the list is n.
 * 1 <= k <= n <= 5000
 * 0 <= Node.val <= 1000
 * 
 * Follow-up: Can you solve the problem in O(1) extra memory space?
 */

class ListNode {
	val: number
	next: ListNode | null
	constructor(val?: number, next?: ListNode | null) {
		this.val = (val === undefined ? 0 : val)
		this.next = (next === undefined ? null : next)
	}
}

function reverseKGroupSpaceO1(head: ListNode | null, k: number): ListNode | null {
	const dummy = new ListNode(0, head);
	let groupPrev = dummy;

	while (true) {
		const kth = getKthNode(groupPrev, k);
		if (!kth) {
			break;
		}
		const groupNext = kth.next;

		let prev = kth.next;
		let curr = groupPrev.next;
		while (curr != groupNext) {
			[curr!.next, prev, curr] = [prev, curr, curr!.next];
		}

		const tmp = groupPrev.next;
		groupPrev.next = kth;
		[groupPrev.next, groupPrev] = [kth, groupPrev.next];
	}
	return dummy.next;

	function getKthNode(curr: ListNode | null, k: number) {
		while (curr && k > 0) {
			curr = curr.next;
			k--;
		}
		return curr;
	}
}

/**
 * This is not a O(1) space solution, but it's quite a bit faster, and O(k) space
 * It's basically a fast slow pointer approach, except that the fast pointer will wait for slow pointer
 * @param head 
 * @param k 
 * @returns 
 */
function reverseKGroupFast(head: ListNode | null, k: number): ListNode | null {
	//declare 2 pointers to keep track of the start and end of the k group
	let startBatch: ListNode | null = head;
	let endBatch: ListNode | null = head;

	const valStack: number[] = [];

	while (!!endBatch) {
		valStack.push(endBatch.val);

		if (valStack.length === k) {
			//reverse the k group, instead of reversing the nodes, we will reverse the values
			while (valStack.length > 0) {
				startBatch!.val = valStack.pop()!;
				//moving forward start pointer too, so it will eventually reach the end pointer
				startBatch = startBatch!.next!;
			}

			//note that if the stack size doesn't reach k, then we leave the nodes as it is
			//equivalent to leaving nodes at the end as it is
		}

		endBatch = endBatch.next;
	}

	return head;
}
