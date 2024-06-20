import type { TreeNode } from "../../../bfs and dfs/Breadth-first-search";

/**
 * Given the root of a binary search tree, and an integer k, return the kth smallest value
 * (1-indexed) of all the values of the nodes in the tree.
 *
 * Example 1:
 *
 * Input: root = [3,1,4,null,2], k = 1
 * Output: 1
 *
 * Example 2:
 *
 * Input: root = [5,3,6,2,4,null,null,1], k = 3
 * Output: 3
 *
 * Constraints:
 *
 * The number of nodes in the tree is n.
 * 1 <= k <= n <= 104
 * 0 <= Node.val <= 104
 *
 * Follow up: If the BST is modified often (i.e., we can do insert and delete operations)
 * and you need to find the kth smallest frequently, how would you optimize?
 */
function kthSmallest(root: TreeNode | null, k: number): number {
	//Analysis:
	//This is a dfs problem, we could keep track of every item in the path
	//but that is not efficient on space,
	//all we need to do is to do an inorder traversal
	//since the inorder traversal of a BST is sorted in ascending order
	//we can just return the kth element
	//we can also optimize this by stopping the traversal when we reach kth element
	//and return that value

	//If the BST is modified often, we can keep track of the count of nodes in the left subtree
	//so that we can know if we need to traverse the left or right subtree
	//this way we can avoid traversing the whole tree
	//this is because we know that the left subtree has all the values less than the current node
	//and the right subtree has all the values greater than the current node
	//so we can easily know if the kth element is in the left or right subtree
	//and traverse only that subtree

	//Complexity:
	//Time: O(n) - we are traversing the tree once
	//Space: O(h) - the depth of the tree, the recursive call stack

	let count = 0;
	let result = 0;

	function inorder(node: TreeNode | null) {
		if (!node)
			return;

		inorder(node.left);
		count++;
		if (count === k) {
			result = node.val;
			return;
		}
		inorder(node.right);
	}

	inorder(root);
	return result;
}
