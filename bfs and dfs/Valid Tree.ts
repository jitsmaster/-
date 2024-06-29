/**
 * Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes),
 * write a function to check whether these edges make up a valid tree.
 *
 * Example 1:
 *
 * Input:
 * n = 5
 * edges = [[0, 1], [0, 2], [0, 3], [1, 4]]
 *
 * Output:
 * true
 *
 * Example 2:
 *
 * Input:
 * n = 5
 * edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]
 *
 * Output:
 * false
 *
 * Note:
 *
 * You can assume that no duplicate edges will appear in edges.
 * Since all edges are undirected, [0, 1] is the same as [1, 0] and thus will not appear together in edges.
 *
 * Constraints:
 *
 * 1 <= n <= 100
 * 0 <= edges.length <= n * (n - 1) / 2
 */

function validTree(nodeCount: number, edges: number[][]) {
	// Algorithm:
	// A valid tree has the following properties:
	// 1. The number of edges is exactly one less than the number of nodes
	// 2. The graph is connected
	// 3. The graph has no cycles

	//IMPORTANT: a tree doesn't have to only have 1 root node, as long as it's connected

	// We can check the first condition by checking the number of edges
	// We can check the second condition by traversing the graph and counting the number of nodes visited
	// We can check the third condition by checking if the graph has any cycles

	if (nodeCount - 1 !== edges.length) {
		return false;
	}

	// Create an adjacency list
	const graph = new Map<number, number[]>();
	const indegree = new Map<number, number>();
	for (let [srcNode, tgtNode] of edges) {
		if (!graph.has(srcNode)) {
			graph.set(srcNode, []);
		}
		if (!indegree.has(tgtNode)) {
			indegree.set(tgtNode, 0);
		}
		//need to add source node entry too, otherwise no way to find the root
		if (!indegree.has(srcNode)) {
			indegree.set(srcNode, 0);
		}
		graph.get(srcNode)!.push(tgtNode);
		indegree.set(tgtNode, (indegree.get(tgtNode) || 0) + 1);
	}

	//now we have adjacency list, we can start traversing the graph
	//starting from the first node
	//first make sure there is only one root node (indegree of 0)
	const roots = [];

	for (let [k, v] of indegree) {
		if (v === 0) {
			roots.push(k);
		}
	}

	//now detect circles
	const visited = new Set<number>();
	//use bfs
	const queue = [roots[0]];
	while (queue.length > 0) {
		const node = queue.shift()!;
		visited.add(node);
		for (let child of graph.get(node) || []) {
			if (visited.has(child)) {
				return false;
			}
			queue.push(child);
		}
	}

	return true;
}