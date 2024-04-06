import { TreeNode } from "../bfs and dfs/Breadth-first-search";

function maxPathSum(root: TreeNode | null): number {
	//the idea is to use a recursive function to traverse the tree
	//and at each node, we calculate the max sum path
	//the max sum path can be:
	//1. the node value itself
	//2. the node value + max sum path of left child
	//3. the node value + max sum path of right child
	//4. the node value + max sum path of left child + max sum path of right child
	//we keep track of the max sum path so far
	//and return it at the end
	//Depth first search is the way to resolve it.

	//Complexity Analysis
	//Time: O(N), where N is the number of nodes in the tree.
	//This is because we visit each node once.
	//Space: O(H), where H is the height of the tree.
	//This is because the maximum amount of space used by the recursion stack is the height of the tree.

	let maxSum = -Infinity; //use the smallest number instead of 0, since the tree may contain negative numbers

	//depth first search function
	function dfs(node: TreeNode | null): number {
		if (node === null) {
			return 0;
		}

		//dfs signature, recursive call directly, instead of building a queue to gather the same level
		//search left first
		const left = Math.max(-Infinity, dfs(node.left));
		//then search right
		const right = Math.max(-Infinity, dfs(node.right));

		//update max sum in global variable, that is left + right + node value
		maxSum = Math.max(maxSum, left + right + node.value);

		//return the max sum path of the current node
		//will take the max of left or right, and add the current node value
		return Math.max(left, right) + node.value;
	}

	return dfs(root);
};