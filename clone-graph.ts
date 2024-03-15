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

	const cloneNodeRecurse = (original: GraphNode): GraphNode => {
		//since graph might have cycles, we jump out
		//of the recursion if we have visited the node before
		if (visited.has(original)) {
			return visited.get(original)!;
		}

		const cloned = new GraphNode(original.val, []);
		visited.set(original, cloned);

		//clone all the neighbors
		for (const neighbor of original.neighbors) {
			cloned.neighbors.push(cloneNodeRecurse(neighbor));
		}

		return cloned;
	};

	return cloneNodeRecurse(node);
}
