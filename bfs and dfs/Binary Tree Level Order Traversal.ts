import type { TreeNode } from "./Breadth-first-search";

/**
 * Given the root of a binary tree, return the level order traversal of its nodes' values.
 * (i.e., from left to right, level by level).
 *
 * Example 1:
 *
 * Input: root = [3,9,20,null,null,15,7]
 * Output: [[3],[9,20],[15,7]]
 *
 * Example 2:
 *
 * Input: root = [1]
 * Output: [[1]]
 *
 * Example 3:
 *
 * Input: root = []
 * Output: []
 *
 * Constraints:
 *
 * The number of nodes in the tree is in the range [0, 2000].
 * -1000 <= Node.val <= 1000
 */

function levelOrder(root: TreeNode | null): number[][] {
	//Analysis:
	//This is the 2 loops technique for grouping items in each level for BFS
	//the inner loop iterate and dequeue on fixed length of the queue (for current level)
	//the outer loop checks the queue length for the next level

	//Complexity:
	//Time: O(n) - we are traversing the tree once
	//Space: O(n) - the queue can go as deep as the number of nodes in the tree (BFS)

	const grps: number[][] = []

	const queue: (TreeNode | null)[] = [];
	queue.push(root)

	while (queue.length) {
		//this requires a 2 loop bfs, since we want to group items together that are in the same level
		const grp = [];

		const l = queue.length;

		for (let i = 0; i < l; i++) {
			//inner loop, make sure we don't check on the queue length while popping for grouping purpose
			const node = queue.shift();
			if (!node)
				continue;

			grp.push(node.val)

			queue.push(node.left)
			queue.push(node.right)
		}

		if (!!grp.length)
			grps.push(grp)
	}

	return grps;
};