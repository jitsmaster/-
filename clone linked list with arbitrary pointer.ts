export class LinkedListNode {
    data: any;
    next: LinkedListNode | undefined;
    arbitrary: LinkedListNode | undefined;

    constructor(value: any) {
        this.data = value;
        this.next = undefined;
        this.arbitrary = undefined;
    }
}

///The purpose is this funciton is to clone a linked list in place
//since linked list is just one way, we don't need recursive functionalities
//just build a map for easy lookup between old and new
function cloneLinkedList(head: LinkedListNode | undefined): LinkedListNode | undefined {
    if (!head) {
        return undefined;
    }

    //use map to store the original node and the cloned node
    const map = new Map<LinkedListNode, LinkedListNode>();

    // Step 1: Create new nodes and insert them between original nodes
    let currentNode = head;
    let clonedHead: LinkedListNode | undefined = undefined;
    let newNode: LinkedListNode | undefined;
    while (currentNode) {
        if (!clonedHead) {
            clonedHead = new LinkedListNode(currentNode.data);
            newNode = clonedHead;
        }
        else {
            newNode = new LinkedListNode(currentNode.data);
        }
        newNode.next = currentNode.next;
        newNode.arbitrary = currentNode.arbitrary;
        map.set(currentNode, newNode);
        //move on to the next node
        currentNode = newNode.next as LinkedListNode;
    }

    // Step 2: Set arbitrary pointers of new nodes, this is the trick part of the question
    // look up in the map
    currentNode = clonedHead as LinkedListNode;
    while (currentNode) {
        if (currentNode.arbitrary) {
            currentNode.arbitrary = map.get(currentNode.arbitrary);
        }

        currentNode = currentNode.next as LinkedListNode;
    }

    return clonedHead;
}