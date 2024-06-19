class TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;

	constructor(val: number) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

function lowestCommonAncestorOfBinarySearchTree(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
	//Time complexity: O(n) - we are traversing the tree once
	//Space complexity: O(1) - constant space with 2 variables

	//get the smaller and larger value of p and q
	const smallVal: number = Math.min(p.val, q.val);
	const largeVal: number = Math.max(p.val, q.val);

	//start from root
	let node: TreeNode | null = root;
	while (node) {
		//if the node value of between the small and large value, then it is the a lowest common ancestor
		//return the node
		if (node.val >= smallVal && node.val <= largeVal)
			return node;
		//if the node value is less than the small value and large value, then we start searching
		//from the right side of the tree
		//keep searching until we find the lowest common ancestor
		if (node.val < smallVal && node.val < largeVal) {
			node = node.right;
		} else {
			//if the node value is greater than the small value and large value, then we start searching
			//from the left side of the tree
			//keep searching until we find the lowest common ancestor
			node = node.left;
		}
	}

	return null;
}

function lowestCommonAncestorOfBinaryTree(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
	//Time complexity: O(n) - we are traversing the tree once
	//Space complexity: O(h) - the call stack can go as deep as the height of the tree

	//It's not a binary search tree, so we can't use the value of the nodes to determine the lowest common ancestor
	//We have to traverse the tree to find the lowest common ancestor
	//We can use a recursive approach to traverse the tree

	//if we reach the end of the tree, return null
	if (!root)
		return null;

	//if we find either of the nodes, return the node
	if (root === p || root === q)
		return root;

	//search the left side of the tree
	const left = lowestCommonAncestorOfBinaryTree(root.left, p, q);
	//search the right side of the tree
	const right = lowestCommonAncestorOfBinaryTree(root.right, p, q);

	//if we find both nodes, then the current node is the lowest common ancestor
	if (left && right)
		return root;

	//if we find only one of the nodes, then return that node
	return left || right;
}