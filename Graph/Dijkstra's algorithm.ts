import { MinPriorityQueue } from "@datastructures-js/priority-queue";

/**
 * Using Disjikstra's algorithm to find the shortest path from k to all other nodes.
 * Disjikstra's algorithm is a greedy algorithm that finds the shortest path from a source node to all other nodes in a weighted graph.
 * The principle of Disjikstra's algorithm is to visit the node with the smallest distance from the source node first, and then update the distances of its neighbors.
 * Meanwhile, cross off the visited nodes to avoid revisiting them.
 * @param times - [source node, target node, time to travel from source to target]
 * @param n - number of nodes in the network
 * @param k - source node
 */
function networkDelayTime(times: number[][], n: number, k: number): number {
	//Time Complexity: O(ElogV) where E is the number of edges and V is the number of vertices
	//Space Complexity: O(V) where V is the number of vertices

	// Create an adjacency list to store the graph
	const unvisitedGraph = new Map<number, [number, number][]>();

	// Populate the adjacency list with the given times
	for (const [srcNode, tgtNode, weight] of times) {
		if (!unvisitedGraph.has(srcNode)) {
			unvisitedGraph.set(srcNode, []);
		}
		unvisitedGraph.get(srcNode)!.push([tgtNode, weight]);
	}

	// Create a priority queue to store the nodes based on their distance from the source node
	const minPQ = new MinPriorityQueue<[number, number]>(node => node[1]);

	// Create a distance array to store the distance of each node from the source node
	// fill them up with infinity
	const dist = new Array<number>(n + 1).fill(Infinity);

	// Initialize the distance of the source node to 0, that is the distance from the source node to itself
	dist[k] = 0;

	// Add the source node to the priority queue
	minPQ.enqueue([k, 0]);

	// Perform Dijkstra's algorithm
	// use the priority queue to get the node with the smallest distance from the source node
	while (!minPQ.isEmpty()) {
		const [srcNode, time] = minPQ.dequeue()!;

		// Skip the node if it has already been visited
		if (!unvisitedGraph.has(srcNode)) {
			continue;
		}

		for (const [tgtNode, weight] of unvisitedGraph.get(srcNode)!) {
			if (dist[srcNode] + weight < dist[tgtNode]) {
				//if the distance from the source node to the target node is less than the current distance
				//update the distance of the target node and add it to the priority queue
				dist[tgtNode] = dist[srcNode] + weight;
				minPQ.enqueue([tgtNode, dist[tgtNode]]);
			}
		}
	}

	// Find the min distance from the source node to any other node
	dist.splice(0, 1);
	const maxTime = Math.max(...dist);

	return maxTime === Infinity ? -1 : maxTime;
}
