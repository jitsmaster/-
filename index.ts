//test number of provinces, with disjointed set
// 	}

import { countComponents } from "./bfs and dfs/union find/Count Connected Components";



let n = 6
let edges = [[0, 1], [1, 2], [2, 3], [4, 5]]



const expected = 2;
const output = countComponents(n, edges);

if (output !== expected)
	console.error(`Output: ${output}, Expected: ${expected}`);
else
	console.log("Success!!!")