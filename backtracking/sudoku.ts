function solveSudoku(board: string[][]): void {
    /**
     * Time complexity: O(9^(n*n))
     * Space complexity: O(n*n)
     */
	if (!board || board.length !== 9 || board[0].length !== 9) {
		return;
	}

	function backtrack(): boolean {
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				if (board[row][col] === '.') {
					for (let num = 1; num <= 9; num++) {
						if (notFilled(board, row, col, num.toString())) {
							board[row][col] = num.toString();
	
							if (backtrack()) {
								return true;
							}
	
							board[row][col] = '.';
						}
					}
	
					return false;
				}
			}
		}
	
		return true;
	}
	
	function notFilled(board: string[][], row: number, col: number, num: string): boolean {
		// check if the number is already in the row, column or 3x3 grid, key to the sudoku game
		for (let i = 0; i < 9; i++) {
			if (board[row][i] === num // check row
				|| board[i][col] === num // check column
				|| board[3 * Math.floor(row / 3) + Math.floor(i / 3)]
					[3 * Math.floor(col / 3) + (i % 3)] === num //check the 3x3 adjacent cells
				) {
				return false;
			}
		}
	
		return true;
	}	

	backtrack();
}

