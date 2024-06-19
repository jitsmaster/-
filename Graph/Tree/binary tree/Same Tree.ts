import type { TreeNode } from "../../../bfs and dfs/Breadth-first-search";

/**
 * Given the roots of two binary trees p and q, write a function to check if they are the same or not.
 *
 * Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.
 *
 * Example 1:
 * 
 * Input: p = [1,2,3], q = [1,2,3]
 * Output: true
 * 
 * Example 2:
 * 
 * Input: p = [1,2], q = [1,null,2]
 * Output: false
 * 
 * Example 3:
 * 
 * Input: p = [1,2,1], q = [1,1,2]
 * Output: false
 * 
 * Constraints:
 * 
 * The number of nodes in both trees is in the range [0, 100].
 * -104 <= Node.val <= 104
 */
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
	//Analysis:
	//Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.
	//We can use DFS to check if the two trees are the same
	//If both nodes are null, return true
	//If one of the nodes is null, return false
	//If both nodes are not null, check if the values are the same
	//Recursively check the left and right children

	//Complexity:
	//Time: O(n), n is the number of nodes in the tree, since we are visiting each node once
	//Space: O(h), for the recursion stack, since the depth of the recursion stack is the height of the tree

	//if both nodes are null, return true	
	//IMPORTANT: must have a stopping point to prevent infinite recursion, in this case, if both nodes are null, return true
	if (!p && !q) return true;
	//if one of the nodes is null, return false
	if (p && q && p.val === q.val)
		//recursively check the left and right children
		return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);

	return false;
}
