class GraphNode {
	val: number;
	neighbors: GraphNode[];

	constructor(val: number, neighbors: GraphNode[] = []) {
		this.val = val;
		this.neighbors = neighbors;
	}
}

//Cloning a graph has to be recursive, unlike linked list, we can't just iterate through the graph
function cloneGraph(node: GraphNode | null): GraphNode | null {
	if (node === null) {
		return null;
	}

	//use a map to store the visited nodes
	const visited = new Map<GraphNode, GraphNode>();

	function cloneNodeRecurse(original: GraphNode): GraphNode {
		if (visited.has(original)) {
			return visited.get(original)!;
		}

		const cloned = new GraphNode(original.val, []);
		visited.set(original, cloned);

		cloned.neighbors = original.neighbors.map(cloneNodeRecurse);

		return cloned;
	}

	return cloneNodeRecurse(node);
}
