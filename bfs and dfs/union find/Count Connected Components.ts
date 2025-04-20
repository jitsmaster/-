/**
 * Count Connected Components in Undirected Graph using Disjoint Set (Union-Find)
 *
 * This implementation uses Disjoint Set data structure with:
 * 1. Path Compression - makes future queries faster
 * 2. Union by Size - keeps trees flat by always attaching smaller tree to larger one
 *
 * Key Concepts:
 * - Each node starts as its own parent (disjoint set)
 * - Union operation connects two nodes by making one's root point to another's root
 * - Find operation locates root parent and performs path compression
 * - Number of connected components equals number of roots (negative values in rank table)
 *
 * Time Complexity:
 * - Initialization: O(n)
 * - Find: O(α(n)) amortized (inverse Ackermann function, effectively constant)
 * - Union: O(α(n)) amortized
 *
 * Space Complexity: O(n)
 *
 * Example Visualization:
 *
 * Initial state for n=5:
 * Nodes: 0 1 2 3 4
 * Parent: -1 -1 -1 -1 -1 (each is its own root with size 1)
 *
 * After union(0,1) and union(2,3):
 * Nodes: 0 1 2 3 4
 * Parent: -2 0 -2 2 -1 (two trees: 0->1 and 2->3, plus single node 4)
 *
 * Path Compression Example:
 * Tree structure before find(3): 0->1->2->3
 * _rankTable = [-4, 0, 1, 2]
 * After find(3):
 * _rankTable = [-4, 0, 0, 0] (all nodes now point directly to root 0)
 */
function countComponents(n: number, edges: number[][]): number {
	/**
	 * Counts connected components in undirected graph using Disjoint Set
	 *
	 * Algorithm:
	 * 1. Initialize DisjointSet with n nodes (each node is its own component)
	 * 2. For each edge, union the two nodes
	 * 3. Each successful union reduces component count by 1
	 * 4. Final component count is the answer
	 *
	 * @param n - number of nodes in graph (0 to n-1)
	 * @param edges - array of edges connecting nodes
	 * @returns number of connected components
	 */
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
	/**
	 * The rank table serves dual purpose:
	 * - For root nodes: stores negative of tree size (e.g. -3 means tree size 3)
	 * - For non-root nodes: stores parent index
	 *
	 * Example:
	 * If node 1's parent is 0 and node 0 is root with size 3:
	 * _rankTable = [-3, 0, ...]
	 */
	private _rankTable!: number[];

	/**
	 * Tracks number of unique roots (connected components)
	 * Decremented each time two components are merged
	 */
	private _uniqueRootsCount: number;

	/**
	 * Creates a new DisjointSet instance.
	 * @param length The length of the disjoint set.
	 */
	constructor(length: number) {
		this._uniqueRootsCount = length;
		this._rankTable = Array(length + 1).fill(-1);
	}

	/**
	 * Finds the root of a node in the disjoint set.
	 * @param n The node to find the root for.
	 * @returns The root of the node.
	 */
	find(n: number): number {
		/**
		 * Finds root of node with path compression
		 *
		 * Path compression flattens the structure by making nodes point directly to root
		 *
		 * Example:
		 * Before find(3) on 0->1->2->3:
		 *   _rankTable = [-4, 0, 1, 2]
		 * After find(3):
		 *   _rankTable = [-4, 0, 0, 0] (all nodes now point directly to root 0)
		 */
		const val = this._rankTable[n];

		// Negative value means this is a root node, or single node
		if (val < 0)
			return n;

		// Path compression: make node point directly to root
		this._rankTable[n] = this.find(val);
		return this._rankTable[n];
	}

	/**
	 * Merges two trees in the disjoint set.
	 * @param a The first node.
	 * @param b The second node.
	 * @returns True if a new union is created, false if the nodes are already unioned.
	 */
	union(a: number, b: number): boolean {
		/**
		 * Unions two sets by size (smaller tree attaches to larger tree)
		 *
		 * When two trees have same size:
		 * - Arbitrarily chooses one as new root (by swapping in line 128)
		 * - New tree size becomes sum of both sizes
		 * - Tree height increases by 1 but path compression will optimize later finds
		 *
		 * Example with same size trees:
		 * Before union(1,3) where:
		 * - Tree A (root 0, size 2): 0->1
		 * - Tree B (root 2, size 2): 2->3
		 * _rankTable = [-2, 0, -2, 2]
		 *
		 * After union(1,3):
		 * - Tree A becomes root (arbitrary choice)
		 * - New size = 2 + 2 = 4
		 * _rankTable = [-4, 0, 0, 2]
		 */
		let rankA = this.find(a);
		let rankB = this.find(b);
		if (rankA === rankB) {
			return false; //already unioned, not counting as new union
		}

		// Ensure rankA is the larger tree (more negative means larger size)
		if (this._rankTable[rankA] < this._rankTable[rankB]) {
			[rankB, rankA] = [rankA, rankB];
		}

		// Merge smaller tree into larger one
		this._rankTable[rankA] += this._rankTable[rankB]; // Add sizes
		this._rankTable[rankB] = rankA; // Point smaller tree to larger root

		return true; //new union
	}

	/**
	 * Gets the count of nodes in the same group as the given node.
	 * @param n The node to get the count for.
	 * @returns The count of nodes in the group.
	 */
	relatedNodeCount(n: number): number {
		//if is root, will have negative value, return the value directly
		const val = this._rankTable[n];
		if (val < 0) {
			return -val;
		}

		//if not root, should just be on step to the root,
		//so return the negative value of the root
		//NOTE: if not path compressed disjoint set, this will be wrong
		return -this._rankTable[val];
	}

	/**
	 * Gets the count of nodes in the biggest group.
	 * @returns The count of nodes in the biggest group.
	 */
	biggestGroupCount(): number {
		return -Math.min(...this._rankTable);
	}

	/**
	 * Gets the count of groups in the disjoint set.
	 * @returns The count of groups.
	 */
	groupsCount(): number {
		return this._uniqueRootsCount;
	}
}