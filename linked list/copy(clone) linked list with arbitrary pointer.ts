export class _Node {

	constructor(public val: number,
		public next: _Node | null,
		public random: _Node | null) {
	}
}

///The purpose is this function is to copy/clone a linked list in place
//since linked list is just one way, we don't need recursive functionalities
//just build a map for easy lookup between old and new
function copyRandomList(head: _Node | null): _Node | null {
	//Complexity:
	//Time: O(n) - we are traversing the list twice, one to clone, one to set arbitrary
	//Space: O(n) - we are storing the mapping of old and new nodes

	if (!head) {
		return null;
	}

	//use map to store the original node and the cloned node
	const map = new Map<_Node, _Node>();

	//new approach to reduce code complexity, by adding a dummy head
	let cloneHead = new _Node(0, head, null);
	let cloneP = cloneHead;
	let p = head;

	while (!!p) {
		const newNode = new _Node(p.val, null, p.random);
		//setting next real time
		cloneP.next = newNode;
		map.set(p, newNode);
		cloneP = newNode;
		p = p.next!;
	}

	cloneP = cloneHead;

	while (!!cloneP) {
		cloneP.random = map.get(cloneP.random!) || null;
		cloneP = cloneP.next!;
	}

	return cloneHead.next;
}