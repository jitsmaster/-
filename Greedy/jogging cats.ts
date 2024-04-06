/**
It's almost summertime, so Big Cat and Little Cat are getting in shape. They decide the core of their fitness plan is to start jogging every day.

Their city consists of  intersections connected by  bidirectional roads. The cats decide that their jogging route should be cyclic (i.e., starting and 
ending at the same intersection) and consist of  different roads.

The cats also love exploring new places, so each day they want to choose a new route to jog on that is not equal to any of their previous routes. 
Two routes are considered to be equal if their sets of component roads are equal.

Given a map of the city, can you help our heroic cats determine the maximum number of days they can go jogging so that every route traveled is different?
 * @param n 
 * @param edges 
 * @returns 
 */
function joggingCatsGetMaxDaysOfDifferentRoutes(n: number, edges: number[][]) {
	//Analysis:
	//1. we need to find the number of different routes
	//2. we can't go over the same route again
	//3. we can't go over the same route in reverse order

	//Complexity:
	//Time: O(n^2 + n^2) since we are iterating over each node and its neighbors basically twice
	//Space: O(n^2 + n) since we are storing the adjacency map and the routes map

	// Helper function to update the count in the map
	function update(map: Map<number, number>, k: bigint) {
		if (map.has(Number(k))) {
			map.set(Number(k), map.get(Number(k))! + 1);
		} else {
			map.set(Number(k), 1);
		}
	}

	let l, r;

	// Create an adjacency map to represent the connections between nodes
	const adjMap = new Map<number, number[]>();

	// Populate the adjacency map based on the given edges
	for (let i = 0; i < edges.length; i++) {
		l = edges[i][0];
		r = edges[i][1];
		if (!adjMap.has(l)) {
			adjMap.set(l, []);
		}
		if (!adjMap.has(r)) {
			adjMap.set(r, []);
		}
		adjMap.get(l)!.push(r);
		adjMap.get(r)!.push(l);
	}

	// Sort the adjacency lists for each node in ascending order
	for (let i = 0; i < n; i++) {
		adjMap.get(i)?.sort();
	}

	// Create a map to store the counts of different routes
	const routesMapByUid: Map<number, number> = new Map();

	// Iterate over each node
	for (let i = 0; i < n; i++) {
		// Calculate the unique identifier for the current node
		// Multiply by 1000000 to avoid overlapping with the neighbor's identifier
		// since node is from 1 to 5 * 10^4, which is less than 10^5
		// 1 million is more than enough to avoid overlapping

		//the reason to generate uid like this is to avoid overlapping with the neighbor's identifier
		//since we don't want to go over the same route again
		const uid = BigInt(i) * BigInt(1000000);

		// Iterate over each neighbor of the current node
		if (!adjMap.has(i)) {
			continue;
		}
		adjMap.get(i)!.forEach(neighbor => {
			// Check if the neighbor has a higher value than the current node
			// This is to avoid counting the same route twice
			// That is also why we sort the adjacency list in ascending order
			if (neighbor > i) {
				const neighborsNeighbors = adjMap.get(neighbor)!;
				let indexOfCurrentNode = neighborsNeighbors.findIndex(x => x === i) + 1;

				// Iterate over the remaining neighbors of the neighbor
				for (; indexOfCurrentNode < neighborsNeighbors.length; indexOfCurrentNode++) {
					const neighborsNeighborUid = uid + BigInt(neighborsNeighbors[indexOfCurrentNode]);
					// Calculate the unique identifier for the route and update the map
					update(routesMapByUid, neighborsNeighborUid);
				}
			}
		});
	}

	let sum = 0;

	// Calculate the sum of counts for each route
	for (const val of routesMapByUid.values()) {
		//this is the formula to do sum of 1 to n: which is n*(n + 1)/2
		//here we are calculating the sum of 1 to n-1: which is n*(n - 1)/2
		sum += (val - 1) * val;
	}

	// Return the maximum number of different routes
	return sum / 2;
}
