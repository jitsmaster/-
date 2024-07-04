/**
 * You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival
 * airports of one flight. Reconstruct the itinerary in order and return it.
 *
 * All of the tickets belong to a man who departs from "JFK", thus, the itinerary must begin with "JFK". If there are
 * multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a
 * single string.
 *
 * For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].
 * You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.
 *
 * Example 1:
 *
 * Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
 * Output: ["JFK","MUC","LHR","SFO","SJC"]
 *
 * Example 2:
 *
 * Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
 * Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
 * Explanation: Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"] but it is larger in lexical order.
 *
 * Constraints:
 *
 * 1 <= tickets.length <= 300
 * tickets[i].length == 2
 * fromi.length == 3
 * toi.length == 3
 * fromi and toi consist of uppercase English letters.
 * fromi != toi
 *
 * @param tickets
 * @returns
 */
export function findItinerary(tickets: string[][]): string[] {
	// This is a DFS problem, using a map as graph

	//Complexity: 
	//Time: O(nlogn) for sorting, O(e) for dfs traversal
	//Space: O(e) for graph, O(e) for dfs stack
	const graph: Map<string, string[]> = new Map();

	for (let [src, tgt] of tickets) {
		if (!graph.has(src)) {
			graph.set(src, []);
		}

		graph.get(src)!.push(tgt);
	}

	// sort each entry
	for (let src of graph.keys()) {
		graph.get(src)!.sort();
	}

	const flightPlan: string[] = [];

	// doing dfs with backtracking
	/**
	 * Performs a depth-first search (DFS) traversal starting from the given node.
	 *
	 * @param departure - The starting node for the DFS traversal.
	 */
	function dfs(departure: string) {
		const destinations = graph.get(departure) || [];

		// we are doing DFS recursion before ever adding the node to the flight plan
		// this is more efficient backtracking quite a bit
		// the order will be recursing to the end, and add the last node first
		// then the second last node, and so on
		// the last node will not have any children, it will bypass the while loop and be added first
		while (destinations.length > 0) {
			dfs(destinations.shift()!);
		}

		// add the origination to the front of the flight plan
		// since recursion is done before adding the node, we are adding the nodes in reverse order
		//IMPORTANT: we are addinging departure, not destination
		flightPlan.unshift(departure);
	}

	dfs("JFK");
	return flightPlan;
}

// this solution works, but over leetcode time limit
export function findItinerarySlow(tickets: string[][]): string[] {
	// This is a DFS problem, using a map as graph
	// also, we are pretty much coming up with exhaustive combos
	// so need to backtrack too

	// first construct the adjacent listing version of the graph
	const graph: Map<string, string[]> = new Map();

	for (let [src, tgt] of tickets) {
		if (!graph.has(src)) {
			graph.set(src, []);
		}

		// must set on target too, otherwise we will miss the last node and dfs will fail and causing backtracking
		if (!graph.has(tgt)) {
			graph.set(tgt, []);
		}

		graph.get(src)!.push(tgt);
	}

	// sort each entry
	for (let src of graph.keys()) {
		graph.get(src)!.sort();
	}

	const flightPlan: string[] = ["JFK"];

	// doing dfs with backtracking
	function dfs(p: string) {
		if (!graph.has(p)) return false;

		// backtracking return condition
		// if number of nodes is number of edges plus 1, we got our result (tree requirement)
		if (flightPlan.length === tickets.length + 1) return true;

		const children = graph.get(p) || [];

		const enumArr = [...children];
		for (let child of enumArr) {
			children.shift();
			flightPlan.push(child);
			if (dfs(child)) return true;
			// back track if failed
			// push the child to the back of children, since we don't want to go over it again in the same level
			children.push(child);
			flightPlan.pop();
		}

		return false;
	}

	dfs(flightPlan[0]);
	return flightPlan;
}
