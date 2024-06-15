/**
Given the root of a binary tree, invert the tree, and return its root.

Example 1:

Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]

Example 2:

Input: root = [2,1,3]
Output: [2,3,1]

Example 3:

Input: root = []
Output: []

Constraints:

The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100
 */
class TreeNode {
	val: number
	left: TreeNode | null
	right: TreeNode | null
	constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
		this.val = (val === undefined ? 0 : val)
		this.left = (left === undefined ? null : left)
		this.right = (right === undefined ? null : right)
	}
}

function invertTreeIterative(root: TreeNode | null): TreeNode | null {
	//use stack instead of recursion
	const stack: (TreeNode | null)[] = [];
	//push root to stack
	stack.push(root);

	while (stack.length) {
		const node = stack.pop();
		if (!node) continue;
		//swap left and right node
		[node.left, node.right] = [node.right, node.left];
		//push left and right node to stack
		stack.push(node.left);
		stack.push(node.right);
	}

	return root;
}

function invertTreeRecurse(root: TreeNode | null): TreeNode | null {
	if (!root) return null;
	[root.left, root.right] = [root.right, root.left];
	invertTreeRecurse(root.left);
	invertTreeRecurse(root.right);
	return root;
}
