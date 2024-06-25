/**
 * Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), 
 * return the number of islands.
 * 
 * An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. 
 * You may assume all four edges of the grid are all surrounded by water.
 * 
 * Example 1:
 * 
 * Input: grid = [
 *   ["1","1","1","1","0"],
 *   ["1","1","0","1","0"],
 *   ["1","1","0","0","0"],
 *   ["0","0","0","0","0"]
 * ]
 * Output: 1
 * 
 * Example 2:
 * 
 * Input: grid = [
 *   ["1","1","0","0","0"],
 *   ["1","1","0","0","0"],
 *   ["0","0","1","0","0"],
 *   ["0","0","0","1","1"]
 * ]
 * Output: 3
 * 
 * Constraints:
 * 
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 300
 * grid[i][j] is '0' or '1'.
 * 
 */
function numIslands(grid: string[][]): number {
	//Analysis:
	//this is a graph problem, we can use dfs or bfs
	//dfs is probably a little faster, but bfs doesn't need recursion
	//the idea is to loop through all the cells, and if it's a land, we do a bfs or dfs to mark all the connected lands
	//all visited spots are marked as water, so we don't visit them again

	//Complexity:
	//time: O(m*n), we visit all the cells
	//space: O(m*n), we use a queue to store the cells to visit

	let islandsCount = 0;

	//this is a graph problem, use dfs
	function bfs(row: number, col: number) {

		if (grid[row][col] === "1") {
			islandsCount++;
		}

		const queue: [number, number][] = [];
		queue.push([row, col]);

		while (queue.length > 0) {
			const [r, c] = queue.shift()!;

			//if visited, stop
			//stop when out of bound
			//also stop when reach water			
			if (c < 0 || c >= grid[0].length
				|| r < 0 || r >= grid.length
				|| grid[r][c] === "0")
				continue;


			grid[r][c] = "0"; //mark as visited, since it's treated the same as water for stop searching

			//add 4 directions coords
			queue.push([r, c - 1])
			queue.push([r, c + 1])
			queue.push([r - 1, c])
			queue.push([r + 1, c])
		}
	}

	//loop through all coords, since we have a set storing what were visisted, no over lapping will be done
	for (let r = 0; r < grid.length; r++) {
		for (let c = 0; c < grid[0].length; c++) {
			bfs(r, c);
		}
	}

	return islandsCount;
};