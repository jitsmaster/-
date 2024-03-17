export class LinkedListNode {
    data: any;
    next: LinkedListNode | null;
    arbitrary: LinkedListNode | null;

    constructor(value: any) {
        this.data = value;
        this.next = null;
        this.arbitrary = null;
    }
}

///The purpose is this funciton is to copy/clone a linked list in place
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

    //first current node is the head of old list
    //from the 2nd, we will be on the new list
    while (currentNode) {
        //if clonedHead is not set, set it to the clone of the existing head
        if (!clonedHead) {
            clonedHead = new LinkedListNode(currentNode.data);
            newNode = clonedHead;
        }
        else {
            //create a new node with value of the current node;
            newNode = new LinkedListNode(currentNode.data);
        }

        //copy linkes,
        //these links all point to existing nodes
        newNode.next = currentNode.next;
        newNode.arbitrary = currentNode.arbitrary;

        //add mapping of current to new node
        map.set(currentNode, newNode);

        //!IMPORTANT: move on to the next node, on the NEW list, not current list        
        currentNode = newNode.next as LinkedListNode;
    }

    // Step 2: Set arbitrary pointers of new nodes, this is the trick part of the question
    // it has to be set separately after all the new nodes are created
    // look up in the map
    currentNode = clonedHead as LinkedListNode;
    while (currentNode) {
        if (currentNode.arbitrary) {
            currentNode.arbitrary = map.get(currentNode.arbitrary) as LinkedListNode;
        }

        currentNode = currentNode.next as LinkedListNode;
    }

    return clonedHead;
}