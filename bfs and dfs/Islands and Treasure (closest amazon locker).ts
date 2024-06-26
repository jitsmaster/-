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

	function bfs(row: number, col: number, chest: [number, number]) {
		//stop when out of bound, or reaching water or another chest
		//can traversed already from the same chest
		//have to use bfs, otherwise, a deeper cell might be traversed first, and the distance will be wrong
		const queue: [number, number][] = [[row, col]];

		let distance = 0;

		while (queue.length > 0) {
			const l = queue.length;
			//inner loop to go through the same level
			for (let i = 0; i < l; i++) {
				const [r, c] = queue.shift()!;

				if (r < 0 || r >= grid.length
					|| c < 0 || c >= grid[0].length
					|| (distance > 0 && grid[r][c] <= 0))
					continue;

				const chestHash = chest[0] * grid[0].length + chest[1]; //formula: row * columnCount + column

				const visitedByThisChest = visited[r][c].has(chestHash);

				if (visitedByThisChest)
					continue;

				grid[r][c] = Math.min(grid[r][c], distance); //increment distance to this chest, if smaller, set on cell

				//set on visited for this cell, using XOR to add the chest hash to the visited
				visited[r][c].add(chestHash);

				//add to queue for next round
				queue.push([r + 1, c]);
				queue.push([r - 1, c]);
				queue.push([r, c + 1]);
				queue.push([r, c - 1]);
			}

			distance++;
		}
	}

	//now starting from all chest coords
	for (let r = 0; r < grid.length; r++) {
		for (let c = 0; c < grid[0].length; c++) {
			if (grid[r][c] === 0) {
				bfs(r, c, [r, c]);
			}
		}
	}
}
