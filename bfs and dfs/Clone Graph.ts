/**
 * Given a reference of a node in a connected undirected graph.
 * Return a deep copy (clone) of the graph.
 * Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.
 *
 * class Node {
 *     public int val;
 *     public List<Node> neighbors;
 * }
 *
 * Test case format:
 * For simplicity, each node's value is the same as the node's index (1-indexed).
 * For example, the first node with val == 1, the second node with val == 2, and so on.
 * The graph is represented in the test case using an adjacency list.
 * An adjacency list is a collection of unordered lists used to represent a finite graph.
 * Each list describes the set of neighbors of a node in the graph.
 * The given node will always be the first node with val = 1.
 * You must return the copy of the given node as a reference to the cloned graph.
 *
 * Example 1:
 * Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
 * Output: [[2,4],[1,3],[2,4],[1,3]]
 * Explanation: There are 4 nodes in the graph.
 * 1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
 * 2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
 * 3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
 * 4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
 *
 * Example 2:
 * Input: adjList = [[]]
 * Output: [[]]
 * Explanation: Note that the input contains one empty list.
 * The graph consists of only one node with val = 1 and it does not have any neighbors.
 *
 * Example 3:
 * Input: adjList = []
 * Output: []
 * Explanation: This an empty graph, it does not have any nodes.
 *
 * Constraints:
 * The number of nodes in the graph is in the range [0, 100].
 * 1 <= Node.val <= 100
 * Node.val is unique for each node.
 * There are no repeated edges and no self-loops in the graph.
 * The Graph is connected and all nodes can be visited starting from the given node.
 */

class Node {
	val: number;
	neighbors: Node[];

	constructor(val: number, neighbors: Node[] = []) {
		this.val = val;
		this.neighbors = neighbors;
	}
}

//Cloning a graph has to be recursive, unlike linked list, we can't just iterate through the graph
function cloneGraph(node: Node | null): Node | null {
	//Analysis:
	//this is a graph problem, we can use dfs or bfs
	//in this case, dfs is much easier to implement
	//since each node can just return the cloned node
	//and we have children processed first, so all neighbors are already cloned
	//we use a map to store the visited nodes to prevent stack overflow on cyclic graphs

	//Complexity: 
	//time: O(V+E), we visit all the nodes and edges
	//space: O(V), we use a map to store the visited nodes

	if (node === null) {
		return null;
	}

	//use a map to store the visited nodes
	const visited = new Map<Node, Node>();

	function dfs(orig: Node): Node {
		if (visited.has(orig)) {
			return visited.get(orig)!;
		}

		const clone = new Node(orig.val, []);
		visited.set(orig, clone);

		for (let n of orig.neighbors) {
			clone.neighbors.push(dfs(n));
		}

		return clone;
	}

	return dfs(node);
}
