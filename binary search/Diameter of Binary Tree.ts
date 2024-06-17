/**
Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree.
This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.

Example 1:

Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].

Example 2:

Input: root = [1,2]
Output: 1

Constraints:

The number of nodes in the tree is in the range [1, 104].
-100 <= Node.val <= 100
 */

import type { TreeNode } from "../bfs and dfs/Breadth-first-search";


//IMPORTANT: This cannot use BFS, since the diameter is alway deep down first, BFS makes no sense here
function diameterOfBinaryTree(root: TreeNode | null): number {
	//Analysis:
	//The diameter of a binary tree is the length of the longest path between any two nodes in a tree.
	//This path may or may not pass through the root.
	//The length of a path between two nodes is represented by the number of edges between them.
	//So, we can calculate the depth of the left and right subtree, recursively
	//The diameter is always left + right, since it's the longest path between any two nodes in the tree
	//We can keep track of the diameter and update it as we go
	//We can use DFS to calculate the depth of the left and right subtree, recursively
	//We can use a global variable to keep track of the diameter

	//Complexity:
	//Time: O(n), n is the number of nodes in the tree, since we are visiting each node once
	//Space: O(h), for the recursion stack, since the depth of the recursion stack is the height of the tree
	let diameter = 0;

	function getDepthDFS(node: TreeNode | null): number {
		if (!node) return 0;

		//calculate the depth of the left and right subtree, recursively
		const left = getDepthDFS(node.left);
		const right = getDepthDFS(node.right);

		//diameter is alway left + right, since it's the longest path between any two nodes in the tree
		diameter = Math.max(diameter, left + right);

		//return the depth of the current node, which is the parent node path plus 1
		return Math.max(left, right) + 1;
	}

	getDepthDFS(root);

	return diameter;
}
