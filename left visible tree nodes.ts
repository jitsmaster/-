/**
 * Definition for a binary tree node.
 */
class TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;

	constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

/**
 * Function to count the number of visible nodes in a binary tree when viewed from the left side.
 * @param {TreeNode} root - The root node of the binary tree.
 * @returns {number} - The number of visible nodes.
 */
/**
 * Calculates the number of visible nodes in a binary tree.
 * A visible node is defined as a node that is the leftmost node at its level.
 * 
 * @param root - The root node of the binary tree.
 * @returns The number of visible nodes in the binary tree.
 */
function visibleNodes(root: TreeNode | null): number {
	// Base case: If the root is null, there are no visible nodes.
	if (root === null) {
		return 0;
	}

	// Initialize a queue to perform sort of breadth-first search.
	const queue: TreeNode[] = [root];
	let visibleNodesCount = 0;

	// Perform level order traversal.
	while (queue.length > 0) {
		const levelSize = queue.length;

		// Iterate through the nodes at the current level.
		for (let i = 0; i < levelSize; i++) {
			//pop the first node from the queue
			//this serves as the function to remove nodes in current layer
			const node = queue.shift();

			// If it's the leftmost node at the current level, increment the visible nodes count.
			if (i === 0) {
				visibleNodesCount++;
			}

			// Add the left and right child nodes to the queue.
			if (node?.left !== null) {
				queue.push(node!.left!);
			}
			if (node?.right !== null) {
				queue.push(node!.right!);
			}
		}
	}

	return visibleNodesCount;
}
