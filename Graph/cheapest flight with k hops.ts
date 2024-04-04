
/**
 * There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei]
 * indicates that there is a flight from city fromi to city toi with cost pricei.
 * 
 * You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops.
 * If there is no such route, return -1.
 * 
 * This is also a Dijkstra's algorithm problem,
 * Except it's not for shortest path for all nodes, just the shortest path to 1 node
 * 
 * @param n - number of cities
 * @param flights - array of flights
 * @param src - source city
 * @param dst - destination city
 * @param k - number of stops
 */
function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
	//Complexity Analysis:
	//Time Complexity: O(ElogV) where E is the number of edges/flight routes and V is the number of vertices/cities
	//Space Complexity: O(V) where V is the number of vertices/cities

	// Create an adjacency list to store the graph
	const costs = new Array(n).fill(Infinity);
	const unvisitedNodes = new Map<number, [number, number][]>();

	// Populate the adjacency list with the given flights
	for (const [from, to, price] of flights) {
		if (!unvisitedNodes.has(from)) {
			unvisitedNodes.set(from, []);
		}
		unvisitedNodes.get(to)!.push([from, price]);
	}

	//no need for pq, just use a stack
	const stack: number[][] = [[dst, 0, k]];

	// Perform Dijkstra's algorithm
	// use the priority queue to get the node with the smallest distance from the source node
	while (!!stack.length) {
		const [tgt, price, stops] = stack.pop()!;

		if (stops < 0) {
			continue; //skip this route if it exceeds the number of stops
		}

		// Skip the node if it has already been visited
		if (!unvisitedNodes.has(tgt)) {
			continue;
		}

		for (const [from, flightPrice] of unvisitedNodes.get(tgt)!) {
			const newPrice = price + flightPrice;
			if (costs[from] > newPrice) {
				costs[from] = newPrice;
				stack.push([from, price + flightPrice, stops - 1]);
			}
		}
	}

	if (costs[src] === Infinity)
		return -1;

	return costs[src];
}
