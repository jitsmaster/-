//test number of provinces, with disjointed set
// 	}

import { islandsAndTreasure } from "./bfs and dfs/Islands and Treasure (closest amazon locker)";

const grid = [[2147483647, 2147483647, 2147483647], [2147483647, -1, 2147483647], [0, 2147483647, 2147483647]]


const expected = [[2, 3, 4], [1, -1, 3], [0, 1, 2]]



islandsAndTreasure(grid);

if (JSON.stringify(grid) !== JSON.stringify(expected)) {
	console.error("Wrong: ")
	console.error(`Expected: ${JSON.stringify(expected)}`)
	console.error(`Actual: ${JSON.stringify(grid)}`)
}
else {
	console.log("Success!")
}