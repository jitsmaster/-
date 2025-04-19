/**
 * In this problem, a tree is an undirected graph that is connected and has no cycles.
 *
 * You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added.
 * The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed.
 * The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge
 * between nodes ai and bi in the graph.
 *
 * Return an edge that can be removed so that the resulting graph is a tree of n nodes.
 * If there are multiple answers, return the answer that occurs last in the input.
 *
 * Example 1:
 *
 * Input: edges = [[1,2],[1,3],[2,3]]
 * Output: [2,3]
 *
 * Example 2:
 *
 * Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
 * Output: [1,4]
 *
 * Constraints:
 *
 * n == edges.length
 * 3 <= n <= 1000
 * edges[i].length == 2
 * 1 <= ai < bi <= edges.length
 * ai != bi
 * There are no repeated edges.
 * The given graph is connected.
 */
function findRedundantConnection(edges: number[][]): number[] {
	//use union find to quickly spot the the redundant edge
	//Common Sense: a tree will n node will have n-1 edges,
	//in this problem, we have n edges, so 1 redundant edge
	//we use union find to build up the tree first, then we will encounter the redundant edge that will indicate a and b already connected
	//that will normally be the last edge added added to an established tree.

	//Complexity:
	//Time: O(n * α(n)) - where α(n) is the inverse Ackermann function, which grows extremely slowly and is nearly constant for practical input sizes.
	//Space: O(n) - for the parent and rank arrays in the disjoint set.

	const ds = new QuickDisjointSetEasyToExplain(edges.length);

	for (let [s, t] of edges) {
		if (ds.union(s, t))
			return [s, t]
	}

	return [];
}

class QuickDisjointSetEasyToExplain {
	private _ranks!: number[];
	private _parents!: number[];
	constructor(length: number) {
		this._ranks = Array(length + 1).fill(-1);
		this._parents = Array(length + 1).fill(-1);
	}

	find(node: number) {
		const parent = this._parents[node];

		// If val < 0, n is the root of its set (negative values often store set size or rank).
		if (parent < 0)
			return node;

		// Path compression: recursively find the root, and update n's parent to point directly to the root.
		this._parents[node] = this.find(parent);

		return this._parents[node];
	}

	union(node1: number, node2: number) {
		const parent1 = this.find(node1);
		const parent2 = this.find(node2);

		if (parent1 === parent2) {
			return true; //already connected
		}

		if (this._ranks[parent1] > this._ranks[parent2]) {

			//node 1 in larger set, merge node 2 in 1
			this._parents[parent2] = parent1;
			this._ranks[parent1] += this._ranks[parent2]
		}
		else {
			//node 2 in larger set, merge node 1 in 2
			this._parents[parent1] = parent2;
			this._ranks[parent2] += this._ranks[parent1]
		}

		return false;
	}
}

class QuickDisjointSet {

	// The link table is an array that represents the parent-child relationships in the disjoint set.
	// Each index represents a node, and the value at that index represents the array size here
	private _linkTable!: number[]
	constructor(length: number) {
		//IMPORTANT:: array length must be l + 1, in order to use node value as index
		this._linkTable = Array(length + 1).fill(-1);
	}

	// The 'find' function is part of a Disjoint Set Union (Union-Find) data structure.
	// It finds the "root" of the set that element 'n' belongs to, with path compression for efficiency.
	find(n: number) {
		// Get the parent (or root indicator) of node n from the link table.
		const val = this._linkTable[n];

		// If val < 0, n is the root of its set (negative values often store set size or rank).
		if (val < 0)
			return n;

		// Path compression: recursively find the root, and update n's parent to point directly to the root.
		this._linkTable[n] = this.find(val);

		// Return the root of n's set.
		return this._linkTable[n];
	}

	// The 'union' function merges two sets containing elements 'a' and 'b'.
	// It uses the 'find' function to determine the roots of both sets and merges them.
	// If they are already in the same set, it returns true.
	// If they are in different sets, it merges them and returns false.
	// The union operation is performed by linking the smaller tree under the larger tree (union by size).
	// This helps keep the tree flat and improves efficiency for future operations
	union(a: number, b: number): boolean {
		let ra = this.find(a);
		let rb = this.find(b);

		if (ra === rb)
			return true; //return true when already connected

		//this step is to point the smaller tree to the larger tree's root
		//we are directly comparing root value, because we know that the parent is smaller number
		//for more complex scenarios, we will have to use another array to store the size of the tree, and make sure
		//that the smaller tree is always pointing to the larger tree
		if (this._linkTable[ra] > this._linkTable[rb])
			[rb, ra] = [ra, rb];

		this._linkTable[rb] += this._linkTable[rb];
		this._linkTable[rb] = ra;

		//skip the children tracing, since no need for quick look up tree size
		return false;
	}
}