//test number of provinces, with disjointed set
// 	}

import { validTree } from "./bfs and dfs/Valid Tree";


let n = 5
let edges = [[0, 1], [2, 0], [3, 0], [1, 4]]


const expected = true;
const output = validTree(n, edges);

if (output !== expected)
	console.error(`Output: ${output}, Expected: ${expected}`);
else
	console.log("Success!!!")