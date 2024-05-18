/**
 * This class represents a Union-Find data structure, also known as a disjoint-set data structure.
 * It is used in Kruskal's algorithm to keep track of the connected components and detect cycles in the graph.
 *
 * The UnionFind class has two main methods: find and union.
 *
 * The find method takes a vertex and returns the root of the connected component that the vertex belongs to.
 * It uses path compression to optimize the find operation by updating the parent of each visited vertex to the root.
 * This ensures that subsequent find operations on the same vertex have a constant time complexity.
 *
 * The union method takes two vertices and merges the connected components that they belong to.
 * It uses the union-by-rank heuristic to optimize the union operation by always attaching the smaller tree to the root of the larger tree.
 * This ensures that the depth of the resulting tree remains small, which improves the time complexity of future find operations.
 *
 * The UnionFind class uses an array called parent to represent the disjoint-set forest.
 * Each element in the array represents a vertex, and its value is the parent of the vertex.
 * If the value is negative, it means the vertex is a root and its absolute value represents the size of the connected component.
 * If the value is non-negative, it means the vertex is not a root and its value is the parent of the vertex.
 *
 * The constructor of the UnionFind class takes the size of the disjoint-set forest as a parameter.
 * It initializes the parent array with all elements set to -1, indicating that each vertex is initially a root and belongs to its own connected component.
 */
class UnionFind {
	parent: number[];

	constructor(size: number) {
		this.parent = new Array(size).fill(-1);
	}

	/**
	 * Finds the root of the connected component that the given vertex belongs to.
	 * Uses path compression to optimize the find operation.
	 *
	 * @param x The vertex to find the root for.
	 * @returns The root of the connected component that the vertex belongs to.
	 */
	find(x: number): number {
		//if the vertex is a root, return it, which means the this.parent[x] is -1
		if (this.parent[x] < 0) {
			return x;
		}

		//otherwise, find the root of the parent of the vertex
		//recursively, and update the parent of the vertex to the root
		return this.parent[x] = this.find(this.parent[x]);
	}

	/**
	 * Merges the connected components that the given vertices belong to.
	 * Uses the union-by-rank heuristic to optimize the union operation.
	 *
	 * @param x The first vertex.
	 * @param y The second vertex.
	 */
	union(x: number, y: number): void {
		//find the roots of the connected components that x and y belong to
		let rootX = this.find(x);
		let rootY = this.find(y);

		//if they belong to the same root, they are already in the same connected component
		if (rootX === rootY) {
			return;
		}

		//union by rank heuristic, merge the smaller tree to the larger tree
		//this step is to find out which tree is larger
		//by comparing the size of the rootX and rootY
		//if the size of the rootX is larger, then swap the rootX and rootY
		if (this.parent[rootX] > this.parent[rootY]) {
			[rootX, rootY] = [rootY, rootX];
		}

		//union happens, merge the smaller tree to the larger tree
		//since we already made sure that the larger tree is at rootX
		//we can just add the size of the smaller tree to the larger tree
		//and update the parent of the smaller tree to the root of the larger tree
		this.parent[rootX] += this.parent[rootY];
		this.parent[rootY] = rootX;
	}
}

class Edge {
	source: number;
	destination: number;
	weight: number;

	constructor(source: number, destination: number, weight: number) {
		this.source = source;
		this.destination = destination;
		this.weight = weight;
	}
}

function kruskalMST(graph: Edge[], numVertices: number): Edge[] {
	/**
	 * Kruskal's algorithm is a greedy algorithm that finds a minimum spanning tree for a connected weighted graph.
	 * This means it finds a subset of the edges that forms a tree that includes every vertex, where the total weight
	 * of all the edges in the tree is minimized. Here's a step-by-step explanation:
	 *
	 * 1. Sort all the edges from low weight to high.
	 * 2. Start adding edges to the MST from the lowest weight edge.
	 * 3. Add an edge if it doesn't form a cycle with the MST obtained so far. To detect a cycle, we can use a disjoint-set data structure.
	 * 4. Repeat step 3 until there are (V-1) edges in the MST where V is the number of vertices.
	 *
	 * In the provided code, Kruskal's algorithm is implemented in the kruskalMST function. The function starts by sorting
	 * the edges in ascending order of their weights. It then initializes an empty array mst to store the edges of
	 * the minimum spanning tree, and a UnionFind object to keep track of the connected components.
	 *
	 * The function then enters a loop that iterates over the edges of the graph. For each edge, it finds the roots of
	 * the source and destination vertices in the UnionFind object. If the roots are different, it means the edge doesn't
	 * form a cycle with the edges in mst, so it adds the edge to mst and unites the two roots in the UnionFind object.
	 *
	 * The function continues this process until it has gone through all the edges of the graph, and then it returns the
	 * mst array, which represents the minimum spanning tree of the graph.
	 */
	// Sort the edges in non-decreasing order of their weights
	graph.sort((a, b) => a.weight - b.weight);

	const mst: Edge[] = [];
	const unionFind = new UnionFind(numVertices);

	for (const edge of graph) {
		const rootX = unionFind.find(edge.source);
		const rootY = unionFind.find(edge.destination);

		if (rootX !== rootY) {
			mst.push(edge);
			unionFind.union(rootX, rootY);
		}
	}

	return mst;
}

// Example usage
const graph: Edge[] = [
	new Edge(0, 1, 4),
	new Edge(0, 7, 8),
	new Edge(1, 2, 8),
	new Edge(1, 7, 11),
	new Edge(2, 3, 7),
	new Edge(2, 8, 2),
	new Edge(2, 5, 4),
	new Edge(3, 4, 9),
	new Edge(3, 5, 14),
	new Edge(4, 5, 10),
	new Edge(5, 6, 2),
	new Edge(6, 7, 1),
	new Edge(6, 8, 6),
	new Edge(7, 8, 7),
];

const numVertices = 9;
const minimumSpanningTree = kruskalMST(graph, numVertices);

console.log('Minimum Spanning Tree:');
for (const edge of minimumSpanningTree) {
	console.log(`${edge.source} -- ${edge.destination} : ${edge.weight}`);
}