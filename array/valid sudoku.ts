/**
 * You are given a a 9 x 9 Sudoku board board. A Sudoku board is valid if the following rules are followed:
 * 
 * Each row must contain the digits 1-9 without duplicates.
 * Each column must contain the digits 1-9 without duplicates.
 * Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without duplicates.
 * 
 * Return true if the Sudoku board is valid, otherwise return false.
 * 
 * Note: A board does not need to be full or be solvable to be valid.
 */

function isValidSudoku(board: string[][]): boolean {
	//instead of going through row, col and 3x3 grid separately, we can do it in one pass
	//we use map to store the number and the row, col, 3x3 grid it is in
	//this approach is is better space wise than the recommended approach from "https://neetcode.io/problems/valid-sudoku"
	//since we are using 3 sets instead of 3 maps, so space complexity is O(1) instead of O(n)

	//Complexity Analysis:
	//Time complexity: O(1), since the board is always 9x9, and we are only going through it once (even it's 2 loops, but that is still going through each cell once)
	//Space complexity: O(1), since the board is always 9x9, and we are only using 3 sets (row, col, grid) to store the values, so it's constant space
	const rowMap = new Set<number>();
	const colMap = new Set<number>();
	const gridMap = new Set<number>();

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			const num = board[row][col];
			if (num === '.') {
				continue;
			}

			//grid is treated like it's own array,
			//since grid is 3x3, so the actual index in the grid array
			//is row * 3 + col
			//and the row and col in the grid is row / 3 and col / 3, which indicates the grid number
			const grid = 3 * Math.floor(row / 3) + Math.floor(col / 3);

			//since we have 10 items per row,
			//so actual index is row * 10 + num
			const rowKey = row * 10 + Number(num);

			//column is treated like pivoted row.
			const colKey = col * 10 + Number(num);

			//grid is treated like it's own row,
			const gridKey = grid * 10 + Number(num);

			//if any of the set has the current value already, then it's not valid
			if (rowMap.has(rowKey) || colMap.has(colKey) || gridMap.has(gridKey)) {
				return false;
			}

			rowMap.add(rowKey);
			colMap.add(colKey);
			gridMap.add(gridKey);
		}
	}

	return true;

}