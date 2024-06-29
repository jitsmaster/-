/**
 * There is an undirected graph with n nodes. There is also an edges array,
 * where edges[i] = [a, b] means that there is an edge between node a and node b
 * in the graph.
 * 
 * Return the total number of connected components in that graph.
 * 
 * Example 1:
 * 
 * Input:
 * n=3
 * edges=[[0,1], [0,2]]
 * 
 * Output:
 * 1
 * 
 * Example 2:
 * 
 * Input:
 * n=6
 * edges=[[0,1], [1,2], [2,3], [4,5]]
 * 
 * Output:
 * 2
 * 
 * Constraints:
 * 
 * 1 <= n <= 100
 * 0 <= edges.length <= n * (n - 1) / 2
 */
function countComponents(n: number, edges: number[][]): number {
	//this is a union find /disjoint set problem
	//except instead of use the disjoint set structure typically:
	//1. finding all nodes related to a node (friendly)
	//2. finding the tree (group) with largest node count (friend count)
	//Here, we use it to count number of trees (groups)

	//Complexity:
	//Time complexity: O(e lg* e) where e is the number of nodes and m is the number of edges
	//NOTE: lg* is the iterated logarithm function, which is the number of times the logarithm function must be applied before the result is less than or equal to 1
	//It often also called inverse Ackermann function, which is a very slowly growing function
	//And lg* is generally faster than log(n) for any practical n
	//Space complexity: O(v) for the disjoint set structure or v + 1 for the link table

	const dSet = new DisjointSet(n); //this one doesn't need related node count at all, since we don't need to quicks finding root or all friends count
	//union each edge
	for (let [a, b] of edges) {
		if (dSet.union(a, b))
			n--;
	}

	return n;
}

/**
 * Represents a Disjoint Set data structure.
 */
export class DisjointSet {
	private _linkTable!: number[];

	/**
	 * This is the count of unique roots in the disjoint set.
	 * It is used to keep track of the number of groups in the disjoint set.
	 * Since counting the number of negative node is not accurate
	 */
	private _uniqueRootsCount: number;

	/**
	 * Creates a new DisjointSet instance.
	 * @param length The length of the disjoint set.
	 */
	constructor(length: number) {
		this._uniqueRootsCount = length;
		this._linkTable = Array(length + 1).fill(-1);
	}

	/**
	 * Finds the root of a node in the disjoint set.
	 * @param n The node to find the root for.
	 * @returns The root of the node.
	 */
	find(n: number): number {
		const val = this._linkTable[n]
		if (val < 0)
			return n;

		this._linkTable[n] = this.find(val);
		return this._linkTable[n];
	}

	/**
	 * Merges two trees in the disjoint set.
	 * @param a The first node.
	 * @param b The second node.
	 * @returns True if a new union is created, false if the nodes are already unioned.
	 */
	union(a: number, b: number): boolean {
		let rootA = this.find(a);
		let rootB = this.find(b);
		if (rootA === rootB) {
			return false; //already unioned, not counting as new union
		}
		if (this._linkTable[rootA] < this._linkTable[rootB]) {
			[rootB, rootA] = [rootA, rootB];
		}
		this._linkTable[rootA] += this._linkTable[rootB];
		this._linkTable[rootB] = rootA;

		//going down to find all descendant nodes of rootB
		//and update them all pointing to root a too,
		//so every node in the group is pointing to root
		//NOTE: this is called path compression
		let rootBChild = this._linkTable.indexOf(rootB);
		while (rootBChild > -1) {
			this._linkTable[rootBChild] = rootA
			rootBChild = this._linkTable.indexOf(rootBChild);
		}

		//each union reduces the amount of unique roots
		this._uniqueRootsCount--;

		return true; //new union
	}

	/**
	 * Gets the count of nodes in the same group as the given node.
	 * @param n The node to get the count for.
	 * @returns The count of nodes in the group.
	 */
	relatedNodeCount(n: number): number {
		//if is root, will have negative value, return the value directly
		const val = this._linkTable[n];
		if (val < 0) {
			return -val;
		}

		//if not root, should just be on step to the root,
		//so return the negative value of the root
		//NOTE: if not path compressed disjoint set, this will be wrong
		return -this._linkTable[val];
	}

	/**
	 * Gets the count of nodes in the biggest group.
	 * @returns The count of nodes in the biggest group.
	 */
	biggestGroupCount(): number {
		return -Math.min(...this._linkTable);
	}

	/**
	 * Gets the count of groups in the disjoint set.
	 * @returns The count of groups.
	 */
	groupsCount(): number {
		return this._uniqueRootsCount;
	}
}