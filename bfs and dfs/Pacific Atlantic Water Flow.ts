/**
 * There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean.
 * The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.
 * 
 * The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).
 * 
 * The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height.
 * Water can flow from any cell adjacent to an ocean into the ocean.
 * 
 * Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.
 * 
 * Example 1:
 * 
 * Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
 * Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
 * Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
 * [0,4]: [0,4] -> Pacific Ocean 
 *        [0,4] -> Atlantic Ocean
 * [1,3]: [1,3] -> [0,3] -> Pacific Ocean 
 *        [1,3] -> [1,4] -> Atlantic Ocean
 * [1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean 
 *        [1,4] -> Atlantic Ocean
 * [2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean 
 *        [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
 * [3,0]: [3,0] -> Pacific Ocean 
 *        [3,0] -> [4,0] -> Atlantic Ocean
 * [3,1]: [3,1] -> [3,0] -> Pacific Ocean 
 *        [3,1] -> [4,1] -> Atlantic Ocean
 * [4,0]: [4,0] -> Pacific Ocean 
 *        [4,0] -> Atlantic Ocean
 * Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.
 * 
 * Example 2:
 * 
 * Input: heights = [[1]]
 * Output: [[0,0]]
 * Explanation: The water can flow from the only cell to the Pacific and Atlantic oceans.
 * 
 * Constraints:
 * - m == heights.length
 * - n == heights[r].length
 * - 1 <= m, n <= 200
 * - 0 <= heights[r][c] <= 105
 */

function pacificAtlantic(heights: number[][]): number[][] {
	//the idea is to dfs from coast one ocean
	//at the highest peak
	//push these peaks into a map

	//then do the same from another cotraverse the gridast to see if there are peaks in the map

	//complexity:
	//O(m * n) , to traverse the grid
	//O(m * n) , to store the peaks map and connected peaks map

	//NOTE: this solution beats 99% on LeetCode for time, 95% for space, and it's completely from my own head
	const rowCount = heights.length;
	const colCount = heights[0].length;


	//true for pacific, false for atlantic
	const peaksSet: Map<number, number> = new Map();

	const connectPeaks: Map<number, [number, number]> = new Map();

	//first from pacific
	//top coast
	const pacCoast: [number, number][] = [];
	for (let i = 0; i < colCount; i++) {
		dfs(0, i, 1);
	}

	//skip the corner
	for (let i = 1; i < rowCount; i++) {
		dfs(i, 0, 1)
	}

	//now check atlantic side
	for (let i = 0; i < colCount; i++) {
		dfs(rowCount - 1, i, 2);
	}

	//skip the corner
	for (let i = 0; i < rowCount - 1; i++) {
		dfs(i, colCount - 1, 2)
	}


	function getCoordsHash(r: number, c: number) {
		return r * heights[0].length + c;
	}

	function dfs(r: number, c: number, side: number) {
		const coordsHash = getCoordsHash(r, c);

		//save to map
		//when dfs on 2, and found it in hash on 1
		//then this is a connecting peak,
		const lastSide = peaksSet.get(coordsHash) || 0;

		//doing a bitwise OR to save both sides
		//so if both side 1 and 2 are found on the same peak, then it's a connecting peak
		//and the value will be 3 =  2 | 1
		peaksSet.set(coordsHash, side | lastSide);

		if (peaksSet.get(coordsHash) === 3) {
			connectPeaks.set(coordsHash, [r, c])
		}

		const thisHeight = heights[r][c]

		//advance the side that has bigger value
		const dirs = [
			[r, c - 1],
			[r, c + 1],
			[r - 1, c],
			[r + 1, c]
		]

		for (let d of dirs) {
			const [r2, c2] = d;
			if (r2 < 0 || r2 >= heights.length
				|| c2 < 0 || c2 >= heights[0].length
				//if the peak is already found on the same side, then no need to go there
				//the check will be if the value is greater than the side value,
				//that means if we are checking on 1, and peak is already 1, then we don't need to go there
				//if checking on 2, and peak is already 2 or 3, then we don't need to go there
				|| (peaksSet.get(getCoordsHash(r2, c2))! & side) >= side)
				continue;

			const h = heights[r2][c2];

			if (h < thisHeight)
				continue;
			dfs(r2, c2, side);
		}
	}

	return Array.from(connectPeaks.values());
};