import { TreeNode } from '../Breadth-first-search';

//principal of in order traversal
//left -> root -> right
//flow of in order traversal:
//1. traverse the left subtree of node recursively
//2. visit the node itself, do what is needed to be done, like creating a doubly linked list node, or push the node value to an array
//3. traverse the right subtree of node recursively

class DoublyLinkedListNode {
	value: number;
	prev: DoublyLinkedListNode | null;
	next: DoublyLinkedListNode | null;

	constructor(value: number) {
		this.value = value;
		this.prev = null;
		this.next = null;
	}
}

function convertBinaryTreeToDoublyLinkedList(root: TreeNode | null): DoublyLinkedListNode | null {
	//the whole idea is to flatten the binary tree to a doubly linked list
	//is to use in order traversal
	//which is the left -> root -> right sequence
	//becausse double linked list node has previous, current and next, this is perfect


	//Complexity Analysis
	//The time complexity of this algorithm is O(n) where n is the number of nodes in the binary tree.
	//This is because we visit each node exactly once.
	//The space complexity of this algorithm is O(1), constant space needed to store the current node and the previous node.

	if (root === null) {
		return null;
	}

	let head: DoublyLinkedListNode | null = null;
	let prev: DoublyLinkedListNode | null = null;

	function inorderTraversal(node: TreeNode | null) {
		//in order traversal algorithm
		//recurse left first
		//then visit the node itself
		//then recurse right

		if (node === null) {
			return;
		}

		inorderTraversal(node.left);

		//generating current node
		const current = new DoublyLinkedListNode(node.value);

		//now linked up the current node with the previous node
		if (prev === null) {
			//if prev is null, this is the first node
			head = current;
		} else {
			//if prev is not null, this node is the node with both left and right
			//set this node as the next of the previous node
			prev.next = current;
			//and set the previous node as the previous of the current node
			current.prev = prev;
			//now connection is complete
		}

		//move prev node pointer to current node
		prev = current;

		inorderTraversal(node.right);
	}

	inorderTraversal(root);

	return head;
}

function checkIfBinaryTreeIsBST(root: TreeNode | null) {
	//the whole idea is to flatten the binary tree to an array of numbers
	//and make sure the array is sorted ascendingly, using in order traversal
	//since in order traveral is always left -> root -> right, the result should be sorted
	//Complexity Analysis
	//The time complexity of this algorithm is O(n) where n is the number of nodes in the binary tree.
	//This is because we visit each node exactly once.
	//The space complexity of this algorithm is O(n) where n is the number of nodes in the binary tree.
	//This is because we use an array to store the in-order traversal of the binary tree's values
	if (root === null) {
		return false;
	}

	// in order traversal of a BST should be sorted
	const inOrderResult = [] as number[];

	function inorderTraversal(current: TreeNode | null) {
		if (current === null) {
			return;
		}
		//in order traversal algorithm
		//recurse left first
		inorderTraversal(current.left);
		//push current
		inOrderResult.push(current.value);
		//then recurse right
		inorderTraversal(current.right);
	}

	inorderTraversal(root);

	//use forloop instead of reduce,
	//can check out early if anomaly is found
	for (let i = 0; i<inOrderResult.length - 1; i++) {
		if (inOrderResult[i] > inOrderResult[i+1])
		  return false;
	}

	return true;
}


