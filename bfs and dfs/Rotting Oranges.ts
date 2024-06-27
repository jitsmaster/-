// #region Functions (1)

/**
 * You are given an m x n grid where each cell can have one of three values:
 * 
 * 0 representing an empty cell,
 * 1 representing a fresh orange, or
 * 2 representing a rotten orange.
 * 
 * Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.
 * 
 * Return the minimum number of minutes that must elapse until no cell has a fresh orange. 
 * If this is impossible, return -1.
 * 
 * Example 1:
 * 
 * Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
 * Output: 4
 * 
 * Example 2:
 * 
 * Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
 * Output: -1
 * Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.
 * 
 * Example 3:
 * 
 * Input: grid = [[0,2]]
 * Output: 0
 * Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.
 * 
 * Constraints:
 * 
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 10
 * grid[i][j] is 0, 1, or 2.
 */
function orangesRotting(grid: number[][]): number {
	//this is a bfs problem, but simultaneously starting from multiple root nodes
	//since they all have to advance in the same time, so very much like middle of bfs state, when the queue has multiple items

	//complexity:
	//O(m * n) , to traverse the grid
	//O(m * n) , queue size can be at most m * n

	let freshCount = 0;
	let cycles = 0;
	const queue: [number, number][] = [];

	for (let r = 0; r < grid.length; r++) {
		for (let c = 0; c < grid[0].length; c++) {
			const val = grid[r][c];
			if (val === 1) {
				freshCount++;
			}
			else if (val === 2) {
				queue.push([r, c]);
			}
		}
	}

	//no rotten one and has fresh one, no way to get them rotten
	//this is to handle the while loop for checking both
	//when we are checking both with AND, then we have to check the edgecase of one of them being true
	if (!queue.length && !!freshCount)
		return -1;

	//starting BFS with all the starting roots
	while (queue.length && freshCount > 0) {
		//inner loop to push next level of children together
		const l = queue.length;
		const startingFresh = freshCount;

		//use hard loop with numbers
		//DONOT use forOf , since that will enumerate the added queue
		for (let i = 0; i < l; i++) {
			const [r, c] = queue.shift()!;

			const val = grid[r][c];
			if (val === 1) {
				//since we are checking to make sure it's a fresh orange, freshcount won't reduce on first starting round
				freshCount--;
			}
			grid[r][c] = 2;

			//check children
			const dirs: [number, number][] = [
				[r, c - 1],
				[r, c + 1],
				[r - 1, c],
				[r + 1, c]
			]
			for (let d of dirs) {
				const [r, c] = d;

				if (r < 0 || r >= grid.length
					|| c < 0 || c >= grid[0].length
					|| grid[r][c] !== 1)
					continue;

				queue.push(d);
			}
		}

		//when indeed propagated, count it as a cycle (1 minute passed)
		if (freshCount < startingFresh) {
			cycles++;
		}
	}

	return freshCount > 0 ? -1 : cycles;
}

// #endregion Functions (1)
