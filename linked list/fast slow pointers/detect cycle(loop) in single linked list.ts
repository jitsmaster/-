import type { LinkedListNode } from "../copy(clone) linked list with arbitrary pointer";

function hasCycle(head: LinkedListNode | null): boolean {
    //Complexity:
    //Time: O(n) - we are traversing the list once
    //Space: O(1) - constant space with 2 variables
    
    if (!head) return false;

    //fast and slow pointer approach
    //slow move 1, fast move 2
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow!.next!;
        fast = fast!.next!.next!;
        if (slow === fast) return true;
    }
    return false;
}