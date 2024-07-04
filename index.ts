//test number of provinces, with disjointed set
// 	}

import { findItinerary } from "./bfs and dfs/with backtracking/Reconstruct Itinerary";




let edges = [["JFK", "KUL"], ["JFK", "NRT"], ["NRT", "JFK"]]



const expected = ["JFK", "NRT", "JFK", "KUL"]
const output = findItinerary(edges);

if (!output.every((val, index) => val === expected[index]))
	console.error(`Output: ${output}, Expected: ${expected}`);
else
	console.log("Success!!!")