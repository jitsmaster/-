import type { TreeNode } from "../../../bfs and dfs/Breadth-first-search";

/**
 * A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge
 * connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass
 * through the root.
 *
 * The path sum of a path is the sum of the node's values in the path.
 *
 * Given the root of a binary tree, return the maximum path sum of any non-empty path.
 *
 * Example 1:
 *
 * Input: root = [1,2,3]
 * Output: 6
 * Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.
 *
 * Example 2:
 *
 * Input: root = [-10,9,20,null,null,15,7]
 * Output: 42
 * Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.
 *
 * Constraints:
 *
 * The number of nodes in the tree is in the range [1, 3 * 104].
 * -1000 <= Node.val <= 1000
 */
function maxPathSum(root: TreeNode | null): number {
	//Analysis:
	//A path is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them
	//A node can only appear in the sequence at most once
	//So if we do DFS from the root, we cannot include a entire subtree in the path
	//The trick is resolve the sub problem of each node and add it to top level
	//meanwhile, use a separate value to store the max path sum

	//The root node might be negative, so we need to initialize the max to -Infinity
	//This is mainly to take care of negative node without children case

	//Complexity:
	//Time: O(n), since we are visiting each node once
	//Space: O(h), where h is the height of the tree, since we are using recursion to traverse the tree, also, storing a single max value
	//Important: recursion always require stack space, so the space complexity is O(h)

	let max = -Infinity;

	function dfs(node: TreeNode | null) {
		if (!node) {
			return 0;
		}

		const leftVal = Math.max(dfs(node.left || null), 0);
		const rightVal = Math.max(dfs(node.right || null), 0);

		//The max path sum for this node is the sum of left, right, and the node itself
		max = Math.max(max, leftVal + rightVal + node.val);

		return Math.max(leftVal, rightVal) + node.val;
	}

	dfs(root);

	return max;
}