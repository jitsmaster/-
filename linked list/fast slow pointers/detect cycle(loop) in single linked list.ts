import type { _Node } from "../copy(clone) linked list with arbitrary pointer";

function hasCycle(head: _Node | null): boolean {
	//Complexity:
	//Time: O(n) - we are traversing the list once
	//Space: O(1) - constant space with 2 variables

	if (!head) return false;

	//fast and slow pointer approach
	//slow move 1, fast move 2
	let slow = head;
	let fast = head;
	while (!!fast && !!fast.next) {
		slow = slow!.next!;
		fast = fast!.next!.next!;

		//when slow and fast meet at some point, there is a cycle
		//since in normal forward linked list, fast will never catch up with slow
		if (slow === fast) return true;
	}
	return false;
}