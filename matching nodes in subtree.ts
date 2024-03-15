// Define a class for the tree node
class GraphNode {
	constructor(public val: number, public children: GraphNode[] = []) {
	}
};

// Function to count the number of nodes in the subtree that match a given character
function countOfNodes(root: GraphNode, queries: any[][], s: string) {
	// Time Complexity: O(n + q), where n is the number of nodes in the tree and q is the number of queries
	// Space Complexity: O(n * n) - 2 dimensional array to store the count of characters in each subtree

	const charCount: number[][] = []; // charCount[i][j] represents the count of character j in the subtree of node i
	const result = [];

	// Initialize charCount array
	for (let i = 0; i <= s.length; i++) {
		charCount[i] = new Array<number>(26).fill(0);
	}

	// Perform DFS to count characters in each subtree
	dfs(root, s, charCount);

	// Process queries
	for (const [u, c] of queries) {
		// Calculate char code differences, that will be the index of the character in the charCount array
		const charIndex = c.charCodeAt(0) - 'a'.charCodeAt(0);
		result.push(charCount[u][charIndex] as never);
	}

	return result;
}

// Depth-first search (DFS) function to count characters in each subtree
function dfs(node: GraphNode, s: string, charCount: number[][]) {
	const charIndex = s.charCodeAt(node.val - 1) - 'a'.charCodeAt(0);
	charCount[node.val][charIndex]++;

	for (const child of node.children) {
		dfs(child, s, charCount);

		// Update charCount of current node by adding counts from its children
		for (let i = 0; i < 26; i++) {
			charCount[node.val][i] += charCount[child.val][i];
		}
	}
}
