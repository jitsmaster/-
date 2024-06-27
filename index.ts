//test number of provinces, with disjointed set
// 	}

import { orangesRotting } from "./bfs and dfs/Rotting Oranges";

const grid = [[1], [2], [1], [2]]


const expected = 1



const output = orangesRotting(grid);

if (expected !== output)
	console.log(`${output} != ${expected}`)
else
	console.log("Success!!!")