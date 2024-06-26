/**
 * You are given a 𝑚 × 𝑛 m×n 2D grid initialized with these three possible values:
 * 
 * -1 - A water cell that can not be traversed.
 * 0 - A treasure chest.
 * INF - A land cell that can be traversed. We use the integer 2^31 - 1 = 2147483647 to represent INF.
 * Fill each land cell with the distance to its nearest treasure chest. If a land cell cannot reach a treasure chest
 * than the value should remain INF.
 * 
 * Assume the grid can only be traversed up, down, left, or right.
 * 
 * Example 1:
 * 
 * Input: [
 *   [2147483647,-1,0,2147483647],
 *   [2147483647,2147483647,2147483647,-1],
 *   [2147483647,-1,2147483647,-1],
 *   [0,-1,2147483647,2147483647]
 * ]
 * 
 * Output: [
 *   [3,-1,0,1],
 *   [2,2,1,-1],
 *   [1,-1,2,-1],
 *   [0,-1,3,4]
 * ]
 * 
 * Example 2:
 * 
 * Input: [
 *   [0,-1],
 *   [2147483647,2147483647]
 * ]
 * 
 * Output: [
 *   [0,-1],
 *   [1,2]
 * ]
 * 
 * Constraints:
 * 
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 100
 * grid[i][j] is one of {-1, 0, 2147483647}
 */

export function islandsAndTreasure(grid: number[][]) {
	//this is a graph problem that can be address by dfs or bfs
	//similar to amazon locker problem, but with limitation added on only can go to places within the same island
	//we will traverse from each treasure chest position, and stop when reaching water (-1), and update each cell's distance with Math.min

	//first find all chests, need a count of it to make sure it can only be 

	//Complexity:
	//O(m * n) to traverse the grid
	//O(m * n * chestNum) to have the chest stored in the visited set

	const visited: Set<number>[][] = [];
	for (let i = 0; i < grid.length; i++) {
		visited[i] = [];
		for (let j = 0; j < grid[0].length; j++) {
			visited[i][j] = new Set();
		}
	}

	function dfs(r: number, c: number, chest: [number, number], distance: number) {
		//stop when out of bound, or reaching water or another chest
		//can traversed already from the same chest
		if (r < 0 || r >= grid.length
			|| c < 0 || c >= grid[0].length
			|| (distance > -1 && grid[r][c] <= 0))
			return;

		const chestHash = chest[0] * grid.length + chest[1]; //formula: row * rowsCount + column

		//use XOR to figure out if the cell was visited by dfs from this chest already
		//any number XOR with itself is 0, so the OR'ed number with the chest hash will be 0, if the cell was visited
		//by this chest already
		//using XOR to check if the cell was visited by this chest already
		//if visited, return
		//make sure distance is greater than 0, to avoid setting the chest as visited
		const visitedByThisChest = visited[r][c].has(chestHash);

		if (visitedByThisChest)
			return;

		const newDistance = distance + 1;
		grid[r][c] = Math.min(grid[r][c], newDistance); //increment distance to this chest, if smaller, set on cell

		//set on visited for this cell, using XOR to add the chest hash to the visited
		visited[r][c].add(chestHash);

		dfs(r, c - 1, chest, newDistance);
		dfs(r, c + 1, chest, newDistance);
		dfs(r - 1, c, chest, newDistance);
		dfs(r + 1, c, chest, newDistance);
	}

	//now starting from all chest coords
	for (let r = 0; r < grid.length; r++) {
		for (let c = 0; c < grid[0].length; c++) {
			if (grid[r][c] === 0) {
				dfs(r, c, [r, c], -1);
			}
		}
	}
}
