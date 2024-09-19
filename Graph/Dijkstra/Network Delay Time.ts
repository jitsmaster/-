import { MinPriorityQueue } from "@datastructures-js/priority-queue";

/**
 * You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, 
 * vi is the target node, and wi is the time it takes for a signal to travel from source to target.
 *
 * We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, 
 * return -1.
 *
 * Example 1:
 *
 * Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
 * Output: 2
 * Example 2:
 *
 * Input: times = [[1,2,1]], n = 2, k = 1
 * Output: 1
 * Example 3:
 *
 * Input: times = [[1,2,1]], n = 2, k = 2
 * Output: -1
 *
 * Constraints:
 *
 * 1 <= k <= n <= 100
 * 1 <= times.length <= 6000
 * times[i].length == 3
 * 1 <= ui, vi <= n
 * ui != vi
 * 0 <= wi <= 100
 * All the pairs (ui, vi) are unique. (i.e., no multiple edges.)
 */
function networkDelayTime(times: number[][], n: number, k: number): number {
	//Dijkstra's algorithm:
	//Important comparing to Prim's algorithm:
	//Dijkstra's algorithm is used to find the shortest path from a source node to all other nodes in a weighted graph.
	//Prim's algorithm is used to find the minimum spanning tree of a graph.

	//Both algorithms are greedy algorithms, but they have different purposes.
	//Both algos also use a min heap that performs BFS

	//create adjacency map of edges
	//keys are the source nodes, targets are 2 item array array. First item is the target, second item is the weight to this target
	//IMPORTANT concept: Adjacency map/list is another way to store graph.
	//it take more space, but has advantage of O(1) lookup

	//Complexity: 
	//Time: O(ElogV) where E is the number of edges and V is the number of vertices
	//Space: O(V) where V is the number of vertices
	const edgesAdjMap = new Map<number, [number, number][]>();

	//fill it out
	for (const [src, tgt, weight] of times) {
		if (!edgesAdjMap.has(src)) {
			edgesAdjMap.set(src, []);
		}

		edgesAdjMap.get(src)?.push([tgt, weight]);
	}

	//push the starting point
	const minHeap = new MinPriorityQueue<[number, number]>(p => p[1]); //first number is node, second number is total distance from root

	//push the starting point in, in the form of [k, 0]: k is the node, 0 is the distance
	minHeap.enqueue([k, 0]);

	//have a visited set to track what was visited already
	const visitedNodes = new Set<number>();

	let totalWeight = 0;

	while (!minHeap.isEmpty()) {
		const [node, weight] = minHeap.dequeue();
		//bypass visited nodes up front, don't even check on their children
		if (visitedNodes.has(node))
			continue;

		//otherwise, get children of this node and start pushing them in, with total distance calculated
		totalWeight = weight; //the weight in the pq was already total weight

		visitedNodes.add(node);
		const edges = edgesAdjMap.get(node) ?? [];
		for (const [tgtNode, tgtWeight] of edges) { //we know the node exists in adjacency map
			//important second check, make sure visited nodes don't even go in the queue
			//so queue only contains forward nodes to search
			if (!visitedNodes.has(tgtNode)) {
				minHeap.enqueue([tgtNode, tgtWeight + totalWeight])
			}
		}
	}

	return visitedNodes.size === n ? totalWeight : -1; //return -1 when not possible to cover all nodes
};