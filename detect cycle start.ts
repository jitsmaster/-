class ListNode {
	val: number
	next: ListNode | null
	constructor(val?: number, next?: ListNode | null) {
		this.val = (val === undefined ? 0 : val)
		this.next = (next === undefined ? null : next)
	}
}

/**
 * Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.
 * @param head 
 * @returns 
 */
function detectCycle(head: ListNode | null): ListNode | null {
	//fast and slow pointer approach,
	//if there is a cycle, they will meet at some point
	//if not, then there is no cycle
	//we just need to figure out where they meet

	//Complexity Analysis
	//Time complexity: O(n) - we iterate through the list once
	//Space complexity: O(1) - we only use 2 pointers to detect the cycle

	let slowPtr = head;
	let fastPtr = head;

	while (!!fastPtr && !!fastPtr.next) {
		//move slow pointer by 1 step
		slowPtr = slowPtr!.next;
		//move fast pointer by 2 steps
		fastPtr = fastPtr!.next!.next;

		if (slowPtr === fastPtr) {
			//cycle detected where the 2 pointers meet
			//now we need to find out where they meet
			//the approach is to move the start pointer to the head
			//and then move both pointers by 1 step
			//they will meet at the start of the cycle
			let startPtr = head;

			while (startPtr !== slowPtr) {
				startPtr = startPtr!.next;
				slowPtr = slowPtr!.next;
			}

			return startPtr;
		}
	}

	return null;
};