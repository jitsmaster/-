//test number of provinces, with disjointed set
// 	}

import { solve } from "./bfs and dfs/Surrounded Regions";


const grid = [["O", "O", "O", "O", "X", "X"], ["O", "O", "O", "O", "O", "O"], ["O", "X", "O", "X", "O", "O"], ["O", "X", "O", "O", "X", "O"], ["O", "X", "O", "X", "O", "O"], ["O", "X", "O", "O", "O", "O"]]


const expected = [["O", "O", "O", "O", "X", "X"], ["O", "O", "O", "O", "O", "O"], ["O", "X", "O", "X", "O", "O"], ["O", "X", "O", "O", "X", "O"], ["O", "X", "O", "X", "O", "O"], ["O", "X", "O", "O", "O", "O"]];


solve(grid);

if (!expected.every((row, i) =>
	row.every((cell, j) =>
		cell === grid[i][j])))
	console.log(`${grid} != ${expected}`)
else
	console.log("Success!!!")