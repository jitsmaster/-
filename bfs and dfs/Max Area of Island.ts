/**
 * You are given an m x n binary matrix grid. An island is a group of 1's (representing land)
 * connected 4-directionally (horizontal or vertical.) You may assume all four edges of the
 * grid are surrounded by water.
 *
 * The area of an island is the number of cells with a value 1 in the island.
 *
 * Return the maximum area of an island in grid. If there is no island, return 0.
 *
 * Example 1:
 *
 * Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],
 * [0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],
 * [0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
 * Output: 6
 * Explanation: The answer is not 11, because the island must be connected 4-directionally.
 *
 * Example 2:
 *
 * Input: grid = [[0,0,0,0,0,0,0,0]]
 * Output: 0
 *
 * Constraints:
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 50
 * grid[i][j] is either 0 or 1.
 */

function maxAreaOfIsland(grid: number[][]): number {
	//Analysis:
	//This is similar to count of islands, except we are returning the max size of the island
	//we can use dfs or bfs,
	//in this case, dfs is much faster than bfs

	//the idea is to loop through all the cells, and if it's a land, we do a dfs to mark all the connected lands
	//all visited spots are marked as water, so we don't visit them again
	//we keep track of the size of the island and return the max size


	//Complexity:
	//time: O(m*n), we visit all the cells
	//space: O(m*n), we use recursion stack or queue to store the cells to visit

	let max = 0;

	function dfs(r: number, c: number): number {
		if (r < 0 || r >= grid.length
			|| c < 0 || c >= grid[0].length
			|| grid[r][c] === 0)
			return 0;

		grid[r][c] = 0;
		return 1 + dfs(r - 1, c) + dfs(r + 1, c) + dfs(r, c - 1) + dfs(r, c + 1)
	}

	function bfs(row: number, col: number) {
		let size = 0;

		const queue = [[row, col]];
		while (queue.length) {
			const [r, c] = queue.shift()!;
			if (r < 0 || r >= grid.length
				|| c < 0 || c >= grid[0].length
				|| grid[r][c] !== 1)
				continue;

			grid[r][c] = 0;
			size++;
			queue.push([r, c - 1])
			queue.push([r, c + 1])
			queue.push([r - 1, c])
			queue.push([r + 1, c])
		}

		console.log(row, col, size)
		max = Math.max(size, max)
	}

	for (let r = 0; r < grid.length; r++) {
		for (let c = 0; c < grid[0].length; c++) {
			// bfs(r, c);
			if (grid[r][c] === 1) {
				max = Math.max(max, dfs(r, c))
			}
		}
	}

	return max
};