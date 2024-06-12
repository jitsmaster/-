/**
 * Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
int get(int key) Return the value of the key if the key exists, otherwise return -1.
void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache.
If the number of keys exceeds the capacity from this operation, evict the least recently used key.
The functions get and put must each run in O(1) average time complexity.

Example 1:

Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
 */

class DoubleLinkedListNode {
	constructor(public key: number, public value: number, public prev: DoubleLinkedListNode | null = null, public next: DoubleLinkedListNode | null = null) { }
}
class LRUCache {
	//Least recently used cache uses a map for O(1) lookup
	//and a double linked list for quick insert and remove
	//everytime there is a get or put operation, the item will be moved to the most right
	//effectly pushing all other items to the left
	//during put, when over size limit, remove the most left side's next item

	//old head stay at the left of the linked list
	//it's easy to have it there to locate the least recently use item as it's next
	private oldHead: DoubleLinkedListNode = new DoubleLinkedListNode(-1, -1);

	//new tail stay at the right of the linked list
	//it's easy to have it there to locate the most recently used (get or put) item, and insert most recently used item	
	private newTail: DoubleLinkedListNode = new DoubleLinkedListNode(-1, -1);

	private map = new Map<number, DoubleLinkedListNode>();

	//Space complexity: O(n) - for the map and linked list

	constructor(private capacity: number) {
		//initial state, nothing between head and tail, they are next to each other
		[this.oldHead.next, this.newTail.prev] = [this.newTail, this.oldHead];
	}

	private removeNode(node: DoubleLinkedListNode) {
		//change pointers to remove the node from the linked list
		node.prev!.next = node.next;
		node.next!.prev = node.prev;
	}

	private _insertLatest(node: DoubleLinkedListNode) {
		//NOTE: not using destructuring, since it's somehow much slower than direct assignments!
		//change pointers for both previous of new tail and new tail to insert the new node between them
		this.newTail.prev!.next = node;
		node.prev = this.newTail.prev;
		node.next = this.newTail;
		this.newTail.prev = node;
	}

	get(key: number): number {
		//Complexity: O(1)
		if (!this.map.has(key)) return -1;

		//get also triggers move, thus remove and insert to the most right
		const node = this.map.get(key)!;
		this.removeNode(node);
		this._insertLatest(node);

		return node.value;
	}

	put(key: number, value: number): void {
		//Complexity: O(1)
		//if the key exists, update the value and move it to the most right
		if (this.map.has(key)) {
			const node = this.map.get(key)!;
			node.value = value;
			this.removeNode(node);
			this._insertLatest(node);
		} else {
			//if not exists, insert the new key value pair to the most right
			//if over capacity, remove the least recently used item from the most left
			if (this.map.size === this.capacity) {
				this.map.delete(this.oldHead.next!.key);
				this.removeNode(this.oldHead.next!);
			}

			const node = new DoubleLinkedListNode(key, value);
			this.map.set(key, node);
			this._insertLatest(node);
		}
	}
}
