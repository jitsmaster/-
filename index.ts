//test number of provinces, with disjointed set
// 	}

import { islandsAndTreasure } from "./bfs and dfs/Islands and Treasure (closest amazon locker)";

const input = [
	[2147483647, -1, 0, 2147483647],
	[2147483647, 2147483647, 2147483647, -1],
	[2147483647, -1, 2147483647, -1],
	[0, -1, 2147483647, 2147483647]
]

const expected = [
	[3, -1, 0, 1],
	[2, 2, 1, -1],
	[1, -1, 2, -1],
	[0, -1, 3, 4]
]



islandsAndTreasure(input);

if (JSON.stringify(input) !== JSON.stringify(expected)) {
	console.error("Wrong: ")
	console.error(`Expected: ${JSON.stringify(expected)}`)
	console.error(`Actual: ${JSON.stringify(input)}`)
}
else {
	console.log("Success!")
}