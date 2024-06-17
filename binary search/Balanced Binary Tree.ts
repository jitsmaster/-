/**
* Given a binary tree, determine if it is height-balanced.
*
* Example 1:
* Input: root = [3,9,20,null,null,15,7]
* Output: true
*
* Example 2:
* Input: root = [1,2,2,3,3,null,null,4,4]
* Output: false
*
* Example 3:
* Input: root = []
* Output: true
*
* Constraints:
* The number of nodes in the tree is in the range [0, 5000].
* -104 <= Node.val <= 104
*/
import type { TreeNode } from "../bfs and dfs/Breadth-first-search";

function isBalanced(root: TreeNode | null): boolean {
	//Analysis:
	//A binary tree is balanced if the depth of the left and right subtree for EVERY node is at most 1
	//This operation is very much like get diameter, except we are not plusing left and right depth, but minus and get abs
	//We can use DFS to calculate the depth of the left and right subtree, recursively
	//We can use a global variable to keep track of the dif
	//If the dif is greater than 1, return false
	//Otherwise, return true

	//Complexity:
	//Time: O(n), n is the number of nodes in the tree, since we are visiting each node once
	//Space: O(h), for the recursion stack, since the depth of the recursion stack is the height of the tree

	let dif = 0;

	function getDepthDifDFS(node: TreeNode | null): number {
		if (!node) return 0;

		const left = getDepthDifDFS(node.left);
		const right = getDepthDifDFS(node.right);

		//the dif is left - right's absolute value
		dif = Math.max(dif, Math.abs(left - right));

		//increment the depth as the deepest child depth plus 1
		return Math.max(left, right) + 1;
	}

	getDepthDifDFS(root);

	return dif <= 1;
}
