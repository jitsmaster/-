import type { TreeNode } from "./Breadth-first-search";

/**
 * Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes
 * with a value greater than X.
 * 
 * Return the number of good nodes in the binary tree.
 * 
 * Example 1:
 * 
 * Input: root = [3,1,4,3,null,1,5]
 * Output: 4
 * Explanation: Nodes in blue are good.
 * Root Node (3) is always a good node.
 * Node 4 -> (3,4) is the maximum value in the path starting from the root.
 * Node 5 -> (3,4,5) is the maximum value in the path
 * Node 3 -> (3,1,3) is the maximum value in the path.
 * 
 * Example 2:
 * 
 * Input: root = [3,3,null,4,2]
 * Output: 3
 * Explanation: Node 2 -> (3, 3, 2) is not good, because "3" is higher than it.
 * 
 * Example 3:
 * 
 * Input: root = [1]
 * Output: 1
 * Explanation: Root is considered as good.
 * 
 * Constraints:
 * 
 * The number of nodes in the binary tree is in the range [1, 10^5].
 * Each node's value is between [-10^4, 10^4].
 */
function goodNodes(root: TreeNode | null): number {
	//Analysis:
	//This is a dfs problem, we could keep track of every item in the path
	//but that is not efficient on space,
	//all we need to do is to track the max parent node value
	//and make sure if current node is above that value, we add 1 to the count
	//since we are required to return all good nodes, including the nodes with good node parents

	//Complexity:
	//Time: O(n) - we are traversing the tree once
	//Space: O(h) - the depth of the tree, the recursive call stack
	function dfs(node: TreeNode | null, max: number): number {
		if (!node)
			return 0;

		//if the current node is a good node, add 1 to the count
		let count = node.val >= max ? 1 : 0;

		//recursively call the left and right nodes, updating the max value
		max = Math.max(max, node.val);
		return count + dfs(node.left, max) + dfs(node.right, max);
	}

	return dfs(root, -Infinity);
}