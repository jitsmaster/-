//test number of provinces, with disjointed set
// 	}

import { numIslands } from "./bfs and dfs/Number of Islands";

const input = [["1", "1", "0", "0", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "1", "0", "0"], ["0", "0", "0", "1", "1"]];

const output = numIslands(input);

console.log(output)