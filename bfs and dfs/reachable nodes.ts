/**
 * There is an undirected tree with n nodes labeled from 0 to n - 1 and n - 1 edges.

You are given a 2D integer array edges of length n - 1 where edges[i] = [ai, bi] indicates that there is an edge between nodes 
ai and bi in the tree. 
You are also given an integer array restricted which represents restricted nodes.

Return the maximum number of nodes you can reach from node 0 without visiting a restricted node.

Note that node 0 will not be a restricted node.
 * @param n 
 * @param edges 
 * @param restricted 
 * @returns 
 */
function reachableNodes(n: number, edges: number[][], restricted: number[]): number {
	//bfs
	//first create a set for restricted
	const restrictedSet = new Set<number>(restricted);
	const edgesMap = new Map<number, number[]>();

	//turn edges into a map, for quick look up on starting node value
	//this is in an adjacent list format, that includes both directions
	for (let [s, e] of edges) {
		if (!edgesMap.has(s))
			edgesMap.set(s, []);
		edgesMap.get(s)!.push(e);
		if (!edgesMap.has(e))
			edgesMap.set(e, []);
		edgesMap.get(e)!.push(s);
	}

	//turn the edges into nodes to easy traversal
	const queue = [0];
	const visited = new Set<number>();

	while (queue.length > 0) {
		const curVal = queue.shift()!;
		if (restrictedSet.has(curVal) || visited.has(curVal)) {
			continue;
		}

		//add visited
		visited.add(curVal);

		//find children
		const tgts = edgesMap.get(curVal) || [];
		queue.push(...tgts);
	}

	return visited.size;
};