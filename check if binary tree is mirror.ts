import type { TreeNode } from "./bfs and dfs/Breadth-first-search";

function isSymmetric(root: TreeNode | null): boolean {
	//recursive approach
	//Time complexity: O(n) - we are traversing the tree once
	//Space complexity: O(h) - the call stack can go as deep as the height of the tree

	function isMirror(n1: TreeNode | null, n2: TreeNode | null): boolean {
		if (!n1 && !n2)
			return true;
		if (!n1 || !n2)
			return false;

		//mirror logic, value equals, and left is mirror of right, and right is mirror of left
		return n1.val === n2.val && isMirror(n1.left, n2.right)
			&& isMirror(n1.right, n2.left);
	}

	return isMirror(root, root)
};

function isSymmetricInOrderTraversal(root: TreeNode | null): boolean {
	//in order traversal approach
	//Time complexity: O(n * 3) - copy tree twice, and compare once
	//Space complexity: O(n * 2) - need to copy the tree twice

	const inOrderResultLeftToRight: number[] = [];
	function inOrderTraversal(node: TreeNode | null): void {
		if (!node)
			return;

		//step 1: traverse the left subtree of node recursively
		inOrderTraversal(node.left);
		inOrderResultLeftToRight.push(node.val);
		//step 2: visit the node itself, do what is needed to be done, like creating a doubly linked list node, or push the node value to an array
		//step 3: traverse the right subtree of node recursively
		inOrderTraversal(node.right);
	}

	const inOrderResultRightToLeft: number[] = [];
	function inOrderTraversalReverse(node: TreeNode | null): void {
		if (!node)
			return;

		//step 1: traverse the left subtree of node recursively
		inOrderTraversalReverse(node.right);
		inOrderResultRightToLeft.push(node.val);
		//step 2: visit the node itself, do what is needed to be done, like creating a doubly linked list node, or push the node value to an array
		//step 3: traverse the right subtree of node recursively
		inOrderTraversalReverse(node.left);
	}

	inOrderTraversal(root);
	inOrderTraversalReverse(root);

	return inOrderResultLeftToRight.join(",") === inOrderResultRightToLeft.join(",");
}