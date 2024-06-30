
/**
 * n this problem, a tree is an undirected graph that is connected and has no cycles.
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

	const ds = new QuickDisjointSet(edges.length);

	for (let [s, t] of edges) {
		if (ds.union(s, t))
			return [s, t]
	}

	return [];
}

class QuickDisjointSet {
	private _linkTable!: number[]
	constructor(length: number) {
		//IMPORTANT:: array length must be l + 1, in order to use node value as index
		this._linkTable = Array(length + 1).fill(-1);
	}

	find(n: number) {
		const val = this._linkTable[n];
		if (val < 0)
			return n;

		this._linkTable[n] = this.find(val);
		return this._linkTable[n];
	}

	union(a: number, b: number): boolean {
		let ra = this.find(a);
		let rb = this.find(b);

		if (ra === rb)
			return true; //return true when already connected

		//merge small into big
		if (this._linkTable[ra] > this._linkTable[rb])
			[rb, ra] = [ra, rb];

		this._linkTable[rb] += this._linkTable[rb];
		this._linkTable[rb] = ra;

		//skip the children tracing, since no need for quick look up tree size
		return false;
	}
}