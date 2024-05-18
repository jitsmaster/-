import { MinPriorityQueue } from "@datastructures-js/priority-queue";

/**
 * You are given an array points representing integer coordinates of some points on a 2D-plane,
 * where points[i] = [xi, yi].
 *
 * The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance between them:
 * |xi - xj| + |yi - yj|, where |val| denotes the absolute value of val.
 *
 * Return the minimum cost to make all points connected. All points are connected if there is exactly
 * one simple path between any two points.
 *
 * @param points - The array of points with integer coordinates.
 * @returns The minimum cost to connect all points.
 */
export function minCostConnectPoints(points: number[][]): number {
	// Prim's algorithm, using a min priority queue
	// This is basically a BFS with heap instead of a queue.

	//Complexity:
	// Time: O(n^2 * log(n)) where n is the number of points (vertices)
	// Space: O(n) for the size of priority queue and the visited set

	/**
	 * Prim's algorithm on building minimum spanning tree explained:
	 * Prim's algorithm is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph.
	 * This means it finds a subset of the edges that forms a tree that includes every vertex, where the total weight
	 * of all the edges in the tree is minimized. Here's a step-by-step explanation:
	 *
	 * 1. Initialize a tree with a single vertex, chosen arbitrarily from the graph. (Any node can be the starting node)
	 * 2. Grow the tree by one edge: of the edges that connect the tree to vertices not yet in the tree,
	 *    find the minimum-weight edge, and transfer it to the tree.
	 * 3. Repeat step 2 (until all vertices are in the tree).
	 *
	 * In the provided code, Prim's algorithm is used to connect all points with the minimum total distance.
	 * The algorithm starts by initializing a priority queue with the first point, a set to keep track of visited points,
	 * and an array to keep track of the minimum distance to each point.
	 *
	 * The algorithm then enters a loop that continues until all points have been visited. In each iteration,
	 * it dequeues a point from the priority queue, checks if it has been visited, and if not, adds its distance to the total minimum distance.
	 *
	 * Then, it goes through all the points and for each point that hasn't been visited, it calculates the distance
	 * to the current point, updates the minimum distance if necessary, and enqueues the point and its distance
	 * to the priority queue.
	 *
	 * This process continues until all points have been visited, at which point the total minimum distance is returned.
	 */

	let minDistance = 0;
	let visited = new Set<number>();
	const minQ = new MinPriorityQueue<[number, number]>(node => node[1]); // [index, distance]

	//the minDist array keeps track of the minimum distance to each point
	//it's basically an adjacency list
	const minDist = new Array<number>(points.length).fill(Infinity);

	minQ.enqueue([0, 0]);

	while (visited.size < points.length) {
		const [i, d] = minQ.dequeue()!;
		//skip the visited vertices
		if (visited.has(i)) continue;

		visited.add(i);
		minDistance += d;

		//go through the frontier vertices
		for (let j = 0; j < points.length; j++) {
			//skip the visited vertices, only find out the distance from not yet connected vertices for the MST
			if (!visited.has(j)) {
				const d = getManhattanDistance(i, j, points);
				//if the distance is smaller than the stored distance in the adjacent list for this node
				//add it to the visited set and update the distance in the adjacent list
				if (d < minDist[j]) {
					minDist[j] = d;
					minQ.enqueue([j, d]);
				}
			}
		}
	}

	return minDistance;

	function getManhattanDistance(i: number, j: number, points: number[][]): number {
		return Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
	}
}



