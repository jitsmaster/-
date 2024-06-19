/**
 * Given the roots of two binary trees root and subRoot, return true if there is a subtree
 * of root with the same structure and node values of subRoot and false otherwise.
 *
 * A subtree of a binary tree tree is a tree that consists of a node in tree and all of
 * this node's descendants. The tree tree could also be considered as a subtree of itself.
 *
 * Example 1:
 *
 * Input: root = [3,4,5,1,2], subRoot = [4,1,2]
 * Output: true
 *
 * Example 2:
 *
 * Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
 * Output: false
 *
 * Constraints:
 *
 * - The number of nodes in the root tree is in the range [1, 2000].
 * - The number of nodes in the subRoot tree is in the range [1, 1000].
 * -104 <= root.val <= 104
 * -104 <= subRoot.val <= 104
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

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
	//there are 2 ways to solve this problem
	//1. Find all potential roots first with dfs, then check if the subtree is the same
	//2. Check if the root is the same, if not, check if the left or right is the same
	//The second approach is more efficient, since it's just a single pass through the base tree
	//instead of multiple passes

	//Complexity:
	//Time: O(n*m) where n is the number of nodes in the root tree and m is the number of nodes in the subRoot tree
	//Space: O(h1 * h2) - where h1 is the height of the root tree and h2 is the height of the subRoot tree, since we are using recursion and the call stack will be the height of the tree

	function sameTree(node1: TreeNode | null, node2: TreeNode | null): boolean {
		if (!node1 && !node2) return true
		if (!node1 || !node2) return false
		return node1.val === node2.val
			&& sameTree(node1.left, node2.left)
			&& sameTree(node1.right, node2.right)
	}

	if (!root && !subRoot) return true

	if (!root || !subRoot) return false

	return sameTree(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)
}
