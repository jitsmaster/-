/**
 * Given an m x n integers matrix, return the length of the longest increasing path in matrix.
 * 
 * From each cell, you can either move in four directions: left, right, up, or down. 
 * You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).
 * 
 * @param matrix 
 * @returns 
 */
function longestIncreasingPath(matrix: number[][]): number {
	//Complexity: 
	//Time: O(m * n *n * m), m is the number of rows, n is the number of columns
	// we need to interate through each cell in the matrix, and for each cell, we need to
	// explore all possible directions, which is n * m, and we need to do this for each cell
	//Space: O(m*n), m is the number of rows, n is the number of columns

	// Check if the matrix is empty
	if (matrix.length === 0 || matrix[0].length === 0) {
		return 0;
	}

	// Get the number of rows and columns in the matrix
	const rows = matrix.length;
	const cols = matrix[0].length;

	// Create a memoization table to store computed results
	const memo: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(-1));

	// Initialize the maximum path length to 0
	let maxPathLength = 0;

	// Iterate through each cell in the matrix
	// since the cell with lowest value doens't necessarily result in the longest path
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			// Compute the longest increasing path starting from the current cell
			maxPathLength = Math.max(maxPathLength, dfs(matrix, i, j));
		}
	}

	return maxPathLength;

	function dfs(matrix: number[][], row: number, col: number): number {
		//Complexity: 
		//Time: O(m*n + 4), m is the number of rows, n is the number of columns, M  * n is number
		// of vertices, and 4 is the number of directions (edges)
		//Space: O(1), no extra space is used, memo is passed by reference

		// Check if the result for the current cell has already been computed
		if (memo[row][col] !== -1) {
			return memo[row][col];
		}

		// Define the possible directions to move in the matrix
		// imagine this as a graph, where the edges are the 4 directions
		const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

		// Initialize the maximum path length to 1
		// since the current cell itself forms a path of length 1
		let maxPath = 1;

		// Explore each direction from the current cell
		for (const [dx, dy] of directions) {
			// Compute the new row and column coordinates
			const newRow = row + dx;
			const newCol = col + dy;

			// Check if the new coordinates are within the matrix boundaries
			// and if the value at the new cell is greater than the current cell
			if (newRow >= 0
				&& newRow < matrix.length
				&& newCol >= 0
				&& newCol < matrix[0].length
				&& matrix[newRow][newCol] > matrix[row][col]) {
				// Compute the longest increasing path starting from the new cell
				maxPath = Math.max(maxPath, 1 + dfs(matrix, newRow, newCol));
			}
		}

		// Store the computed result in the memoization table
		memo[row][col] = maxPath;

		// Return the maximum path length starting from the current cell
		return maxPath;
	}
}

