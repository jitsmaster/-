/**
 * In a gold mine grid of size m x n, each cell in this mine has an integer representing the amount of gold in that cell,
 * 0 if it is empty.
 * 
 * Return the maximum amount of gold you can collect under the conditions:
 * 
 * - Every time you are located in a cell you will collect all the gold in that cell.
 * - From your position, you can walk one step to the left, right, up, or down.
 * - You can't visit the same cell more than once.
 * - Never visit a cell with 0 gold.
 * - You can start and stop collecting gold from any position in the grid that has some gold.
 * 
 * @param grid 
 * @returns 
 */
function getMaximumGold(grid: number[][]): number {
	/**
	 * The provided code snippet is an implementation of the dfs (depth-first search) function. 
	 * Let's go through the code step by step to understand how it works:

	 * The dfs function takes in two parameters: row and col, representing the current position in the grid.
	 * It initializes a variable gold to keep track of the maximum amount of gold collected so far.
	 * The value of the current cell is stored in the cellVal variable, and the cell is set to 0 to mark it as visited.
	 * The function then iterates over the four possible directions: up, down, left, and right. 
	 * This is done using the dirs array, which contains the offsets for each direction.
	 * For each direction, it calculates the coordinates of the next cell (nextRow and nextCol).
	 * It checks if the next cell is out of bounds or if it contains 0 gold. 
	 * If either of these conditions is true, it continues to the next iteration of the loop.
	 * If the next cell is valid, the dfs function is recursively called with the coordinates of the next cell. 
	 * The result of the recursive call is compared with the current maximum gold (gold), and the larger value is stored in gold.
	 * After exploring all possible directions, the original value of the current cell is restored by assigning cellVal back to grid[row][col].
	 * Finally, the function returns the sum of the maximum gold collected so far (gold) and the gold in the current cell (cellVal).
	 * The dfs function is used within the getMaximumGold function to explore all possible paths in the grid and find the maximum amount of gold that can be collected.
	 */
	const rows = grid.length, cols = grid[0].length;
	//instead of using 2 2-dim arrays, we can use this to represent the 4 directions
	//the way to use is is to use i and 3-i to get the opposite direction
	//for next row, it's d[i], for next col, it's d[3-i]
	//e.g. if i = 0, then next row is row + d[0], next col is col + d[3-0] = col + d[3] = col + 0 = col, which is same row to the right
	//if i = 1, then next row is row + d[1], next col is col + d[3-1] = col + d[2] = col - 1, which is same row to the left
	//if i = 2, then next row is row + d[2], next col is col + d[3-2] = col + d[1] = col + 1, which is row above
	//if i = 3, then next row is row + d[3], next col is col + d[3-3] = col + d[0] = col, which is row below
	const dirs = [1, -1, 0, 0];

	/**
	 * Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures.
	 * The 4 directs are considered as 2 children of each cell
	 * @param row 
	 * @param col 
	 * @returns 
	 */
	function dfs(row: number, col: number): number {
		let gold = 0;
		const cellVal = grid[row][col];
		grid[row][col] = 0;

		for (let i = 0; i < 4; ++i) {
			const nextRow = row + dirs[i], nextCol = col + dirs[3 - i];
			if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols || grid[nextRow][nextCol] === 0) {
				continue;
			}
			gold = Math.max(gold, dfs(nextRow, nextCol));
		}

		grid[row][col] = cellVal;
		return gold + cellVal;
	}

	let res = 0;
	for (let row = 0; row < rows; ++row) {
		for (let col = 0; col < cols; ++col) {
			let goldNeighbours = 0;
			for (let i = 0; i < 4; ++i) {
				//check if the neighbour is a valid cell and contains gold
				//if yes, increment the count of gold neighbours
				//if the count of gold neighbours is less than or equal to 2,
				//call the dfs function to explore the path and update the result
				//this reduces the number of starting points for the dfs function
				//reason: if a cell has more than 2 gold neighbours, it will be visited by other cells
				//so we don't need to start the dfs from this cell
				//Note: this is the most important optimization in this solution
				//DFS is just standard, but reducing the number of starting points is the key

				/**
				 * But why consider only cells with gold Neighbours 2 or less?
				 * Any cell with 3 or more neighbouring gold cells will have a greater gold collection if considered by a neighbouring gold cell than starting dfs from it.
				 * in other words, if a cell has 3 or more neighbouring gold cells, it will be visited by a neighbouring gold cell, 
				 * so we don't need to start the dfs from this cell.
				 * 
				 * Give it a thought, this idea will soon hit you.
				 * Look at the starting cell for DFS, it will satisfy this optimization. It helps.
				 */
				const nr = row + dirs[i], nc = col + dirs[3 - i];
				if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] !== 0) {
					++goldNeighbours;
				}
			}
			if (goldNeighbours <= 2) {
				res = Math.max(res, dfs(row, col));
			}
		}
	}

	return res;
}