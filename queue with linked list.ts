class LinkedListNode {
    data: number;
    next: LinkedListNode | undefined;

    constructor(value: number) {
        this.data = value;
        this.next = undefined;
    }
}


class MyCircularQueue {
    //Complexity:
    //Time: O(1) - no iteration is ever needed
    //Space: O(n) - where n is the size of the queue
    private _head?: LinkedListNode;
    private _tail?: LinkedListNode;

    private _sizeLimit: number;
    private size = 0;

    constructor(k: number) {
        this._sizeLimit = k;
    }

    enQueue(value: number): boolean {
        if (this.size < this._sizeLimit) {
            if (!this._head) {
                this._head = new LinkedListNode(value);
                this._tail = this._head;
            }
            else {
                this._tail!.next = new LinkedListNode(value);
                this._tail = this._tail!.next;
            }
            this.size++;

            return true;
        }
        return false;
    }

    deQueue(): boolean {
        if (!this._head) {
            return false;
        }

        //move the head to the next node
        this._head = this._head.next;

        if (!this._head)
            this._tail = undefined;

        this.size--;

        return true;
    }

    Front(): number {
        return !!this._head ? this._head.data : -1;
    }

    Rear(): number {
        return !!this._tail ? this._tail.data : -1;
    }

    isEmpty(): boolean {
        return !this.size;
    }

    isFull(): boolean {
        return this.size === this._sizeLimit;
    }
}