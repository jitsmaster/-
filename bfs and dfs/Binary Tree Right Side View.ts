/**
 * Given the root of a binary tree, imagine yourself standing on the right side of it,
 * return the values of the nodes you can see ordered from top to bottom.
 *
 * Example 1:
 * Input: root = [1,2,3,null,5,null,4]
 * Output: [1,3,4]
 *
 * Example 2:
 * Input: root = [1,null,3]
 * Output: [1,3]
 *
 * Example 3:
 * Input: root = []
 * Output: []
 *
 * Constraints:
 * The number of nodes in the tree is in the range [0, 100].
 * -100 <= Node.val <= 100
 */

import type { TreeNode } from "./Breadth-first-search";

function rightSideView(root: TreeNode | null): number[] {
	//this is bfs like level order traversal, but only taking the last item for each level
	//Complexity:
	//Time: O(n) - we are traversing the tree once
	//Space: O(n) - the queue can go as deep as the number of nodes in the tree (BFS)
	if (!root)
		return [];

	const queue = [root]
	const rightSide = []

	while (queue.length) {
		const l = queue.length;
		let node;

		//same inner loop as level order traversal, for grouping in the same level
		//in this case, get last item
		for (let i = 0; i < l; i++) {
			node = queue.shift();
			if (node!.left)
				queue.push(node!.left)
			if (node!.right)
				queue.push(node!.right)
		}

		rightSide.push(node!.val)
	}

	return rightSide
};