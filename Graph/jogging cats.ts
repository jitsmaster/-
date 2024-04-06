/**
 * It's almost summertime, so Big Cat and Little Cat are getting in shape. They decide the core of their fitness plan
 * is to start jogging every day.
 * 
 * Their city consists of intersections connected by bidirectional roads. The cats decide that their jogging route
 * should be cyclic (i.e., starting and ending at the same intersection) and consist of different roads.
 * 
 * The cats also love exploring new places, so each day they want to choose a new route to jog on that is not equal
 * to any of their previous routes. Two routes are considered to be equal if their sets of component roads are equal.
 * 
 * Given a map of the city, can you help our heroic cats determine the maximum number of days they can go jogging
 * so that every route traveled is different?
 * 
 * @param intersections 
 * @param edges 
 */
function joggingCatsGetMaxDaysOfDifferentRoutes(intersections: number, edges: number[][]): number {
	//build a bi-directional graph, then use dfs to find the number of different routes
	const graph: Map<number, number[]> = new Map();
	for (let i = 0; i < edges.length; i++) {
		const [start, end] = edges[i];
		if (!graph.has(start)) {
			graph.set(start, []);
		}
		if (!graph.has(end)) {
			graph.set(end, []);
		}
		graph.get(start)!.push(end);
		graph.get(end)!.push(start);
	}

	//dfs to find the number of different routes
	let result = 0;

	//backtrack to find the number of different routes
	function dfs(visited: Set<number>, current: number): void {
		if (current === 1 && visited.size === intersections - 1) {
			console.info(`confirmed route: 1>${Array.from(visited).join(">")}>${current}`)

			result++;
			return;
		}

		const neighbors = graph.get(current);
		if (!neighbors || neighbors.length === 0) {
			return;
		}

		visited.add(current);

		for (let neighbor of neighbors) {
			if (!visited.has(neighbor)) {
				dfs(visited, neighbor);
			}
		}
		visited.delete(current);
	}

	//start from 1 and go through all intersections
	const oneNeighbors = graph.get(1);
	if (!oneNeighbors || oneNeighbors.length === 0) {
		return 0;
	}
	for (let n of oneNeighbors) {
		//all routes start with 1, so we have to start from next stops of 1, in a set of dfs
		//so backtracking will be go back beyond 1
		dfs(new Set<number>(), n);
	}

	return result;
}