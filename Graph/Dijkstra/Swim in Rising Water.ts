import { MinPriorityQueue } from "@datastructures-js/priority-queue";

/**
 * You are given an n x n integer matrix grid where each value grid[i][j] represents the elevation at that point (i, j).
 * 
 * The rain starts to fall. At time t, the depth of the water everywhere is t. You can swim from a square to another 
 * 4-directionally adjacent square if and only if the elevation of both squares individually are at most t. You can 
 * swim infinite distances in zero time. Of course, you must stay within the boundaries of the grid during your swim.
 * 
 * Return the least time until you can reach the bottom right square (n - 1, n - 1) if you start at the top left square 
 * (0, 0).
 * 
 * Example 1:
 * 
 * Input: grid = [[0,2],[1,3]]
 * Output: 3
 * Explanation:
 * At time 0, you are in grid location (0, 0).
 * You cannot go anywhere else because 4-directionally adjacent neighbors have a higher elevation than t = 0.
 * You cannot reach point (1, 1) until time 3.
 * When the depth of water is 3, we can swim anywhere inside the grid.
 * 
 * Example 2:
 * 
 * Input: grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
 * Output: 16
 * Explanation: The final route is shown.
 * We need to wait until time 16 so that (0, 0) and (4, 4) are connected.
 * 
 * Constraints:
 * 
 * n == grid.length
 * n == grid[i].length
 * 1 <= n <= 50
 * 0 <= grid[i][j] < n^2
 * Each value grid[i][j] is unique.
 */
export function swimInWater(grid: number[][]): number {
	//Dijkstra algo.
	//Still the same principle, but how we calculate the weight is not the distance sum, but max of height for each cell
	//dijkstra step 1: create adjacency map
	//we don't really need it here, since we don't need to sum the weight

	const visited = new Set<number>();

	//min heap priority on the height of cell
	//however, the height is not the cell itself, but the max height along the path to travel here
	//each item as 2 values [row, col, maxheight]
	const minHeap = new MinPriorityQueue<[number, number, number]>(p => p[2]);

	function getCoordValue(row: number, col: number) {
		return row * grid[0].length + col;
	}

	const dirs = [
		[-1, 0],
		[1, 0],
		[0, 1],
		[0, -1]
	];

	//push the top left in
	minHeap.enqueue([0, 0, grid[0][0]]);

	while (!minHeap.isEmpty()) {
		const cell = minHeap.dequeue();

		//check if we are at the end
		if (cell[0] === grid.length - 1 && cell[1] === grid[0].length - 1) {
			//when reached the end, the weight is guaranteed to be the max height
			//since optimal path is chosen already
			return cell[2];
		}

		visited.add(getCoordValue(cell[0], cell[1]));

		//BFS to 4 directions
		for (const d of dirs) {
			const [r, c] = [cell[0] + d[0], cell[1] + d[1]];
			if (r >= 0
				&& r < grid.length
				&& c >= 0
				&& c < grid[0].length
				&& !visited.has(getCoordValue(r, c))) {
				const weight = Math.max(grid[r][c], cell[2]);
				//enqueue
				minHeap.enqueue([r, c, weight]);
			}
		}
	}
};