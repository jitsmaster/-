/**
 * You are given an m x n matrix board containing letters 'X' and 'O', capture regions that are surrounded:

Connect: A cell is connected to adjacent cells horizontally or vertically.
Region: To form a region connect every 'O' cell.
Surround: The region is surrounded with 'X' cells if you can connect the region with 'X' cells 
and none of the region cells are on the edge of the board.
A surrounded region is captured by replacing all 'O's with 'X's in the input matrix board.

Example 1:

Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
Explanation:
In the above diagram, the bottom region is not captured because it is on the edge of the board 
and cannot be surrounded.

Example 2:

Input: board = [["X"]]
Output: [["X"]]

Constraints:

m == rows
n == board[i].length
1 <= m, n <= 200
board[i][j] is 'X' or 'O'.
 */

export function solve(board: string[][]): void {
	//the trick is to build out a region and see if any of the region member reached the edge of board
	//we can use bfs to achieve that
	const rows = board.length;
	const cols = board[0].length;

	const regions: {
		coords: [number, number][],
		isSurrounded: boolean
	}[] = []

	const visited = Array.from({
		length: rows
	}, () => Array(cols).fill(false))

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			const cell = board[r][c]
			if (cell === "O")
				bfs(r, c)
		}
	}

	//bfs to build region
	//it will stop when meet x or at the edge of board    
	function bfs(row: number, col: number) {
		//if root already visited, return
		if (visited[row][col])
			return;

		const queue = [[row, col]]
		const newRegion = {
			coords: [] as [number, number][],
			isSurrounded: false
		};

		let hasEdge = false;
		while (queue.length) {
			const [r, c] = queue.shift()!;
			//push into region for this O spot
			newRegion.coords.push([r, c]);
			visited[r][c] = true;

			//now check children
			const dirs = [
				[r, c - 1],
				[r, c + 1],
				[r - 1, c],
				[r + 1, c]
			]
			for (let d of dirs) {
				const [r2, c2] = d;
				//if any of the children are out of bound,
				//return and leave the region as not surrounded                
				if (r2 < 0 || r2 >= rows
					|| c2 < 0 || c2 >= board[0].length) {
					hasEdge = true;
					continue;
				}

				//if the cell was visited, skip this direction
				if (visited[r2][c2])
					continue;

				const cell = board[r2][c2];

				if (cell === "O") {
					queue.push(d); //if the direction is O, go into it the next round
				}
			}
		}

		//if the loop is finished, then set the region is surrounded
		if (!hasEdge)
			regions.push(newRegion);
	}

	//loop through the surrounded regions and mark off each cell
	for (let rg of regions) {
		for (let [r, c] of rg.coords) {
			board[r][c] = "X"
		}
	}
};
