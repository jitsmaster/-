import type { LinkedListNode } from "./copy(clone) linked list with arbitrary pointer";

function reverseArrayInKGroups(arr: any[], k: number): void {
    //in place reverse
    for (let i = 0; i < arr.length; i += k) {
        let start = i;
        //the chunk size can be less than k
        //so we need to find the minimum between the end index and the length of the array
        let end = Math.min(i + k - 1, arr.length - 1);
        //2 pointers swap for each chunk
        while (start < end) {
            //swap the start and end elements
            [arr[end], arr[start]] = [arr[start], arr[end]];
            start++;
            end--;
        }
    }
}

class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val: number, next: ListNode | null = null) {
        this.val = val;
        this.next = next;
    }
}

function reverseLinkedListInKGroups(head: ListNode | null, k: number): ListNode | null {
    //Complexity:
    //Time: O(n * 2) - we are traversing the list twice
    //Space: O(n) - 2d array the size of the list

    //no recursive approach
    //grab the nodes in chunks of k upfront
    //reverse each chunk, if the length is k
    //append the new head as next of the last tail

    const nodeGrps: ListNode[][] = [];

    function getChunks(): void {
        let count = 0;
        let chunk: ListNode[] = [];
        let start = head;
        while (!!start) {
            chunk.push(start);
            start = start.next;
            if (chunk.length === k || !start) {
                nodeGrps.push(chunk);
                chunk = [];
                console.info(`range: []${chunk.map(n => n.val).join(", ")}]`)
            }
        }
    }

    let lastTail: ListNode | null = null;
    let newTail: ListNode | null = null;
    let trueHead: ListNode | null = null;
    let newHead = head;

    getChunks();

    for (let range of nodeGrps) {

        if (range.length === k) {
            newTail = range[0];
            newHead = range[range.length - 1];
            newTail.next = null;
            for (let i = 0; i < k - 1; i++) {
                const cur = range[i];
                const next = range[i + 1];
                next.next = cur;
            }
        }
        else if (range.length > 0) {
            //no reverse
            newHead = range[0];
            newTail = range[range.length - 1]
        }

        console.info(`new head: ${newHead!.val}`)

        if (!trueHead)
            trueHead = newHead;

        //append the new head as next of last tail;
        if (!!lastTail) {
            lastTail.next = newHead;
        }

        lastTail = newTail;
    }

    return trueHead;
}





function reverseLinkedListInKGroupsConstantSpace(head: ListNode | null, k: number): ListNode | null {
    //Complexity:
    //Time: O(n * 2) - we are traversing the list twice
    //Space: O(1) - constant space

    if (!head || !head.next || k === 1) {
        return head;
    }

    function getEndOfGroup(start: ListNode, k: number): ListNode | null {
        let count = 0;
        let current: ListNode | null = start;

        while (current && count < k) {
            count++;
            current = current.next;
        }

        return current;
    }

    function reverseGroup(root: ListNode, start: ListNode, end: ListNode) {
        let prev = null;
        let current = start;
        let next = start.next;

        root.next = end;

        while (prev !== end) {
            current.next = prev;
            prev = current;
            current = next as ListNode;
            next = next?.next || null;
        }

        start.next = current;

        return start;
    };

    const tempHead = new ListNode(-1, head);

    let current = tempHead;

    while (current?.next) {
        const endOfGroup = getEndOfGroup(current, k);
        if (endOfGroup === null) {
            break;
        }

        const nextCurrent = reverseGroup(current, current.next, endOfGroup);

        current = nextCurrent;
    }

    return tempHead.next;
};
