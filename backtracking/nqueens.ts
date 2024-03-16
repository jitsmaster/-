function solveNQueens(n: number): string[][] {
    /**
     * Complexity
        Time complexity:
        O(n2∗n!)

        Space complexity:
        O(n2)
     */
    const result: string[][] = [];
    // const board: number[] = [];

    const boardTemplate = Array(n).fill(".").join("");
    function printBoard(board: number[]) {
        return board.map((col) =>
            `${boardTemplate.slice(0, col)}Q${boardTemplate.slice(col + 1)}`
        );
    };

    function isSafe(colNum: number, board: number[]) {
        //check all previous rows to see if the current column is safe
        for (let row = 0; row < board.length; row++) {
            const col = board[row];
            //check if the current column is already used in the previous rows
            if (colNum === col) {
                return false;
            }

            //check if the current column is used in the diagonals
            //since queen moves diagonally, if the difference between the current column and the previous column
            //is equal to the difference between the current row and the previous row, then it means the current column
            //is used in the diagonal
            const diff = board.length - row;
            if (colNum === col + diff || colNum === col - diff) {
                return false;
            }
        }

        return true;
    };

    function backtrack(board: number[]) {
        if (board.length === n) {
            //board is full, add the result to the result array
            result.push(printBoard(board));
            return;
        }

        for (let col = 0; col < n; col++) {
            if (isSafe(col, board)) {
                //step1: push the current option to the board
                board.push(col);
                //step2: backtrack
                backtrack(board);
                //step3: undo the step1 by popping the last element from the board, this line 
                // is reached, when step2 of recursive backtracking didn't product  result
                board.pop();
            }
        }
    };

    backtrack([]);

    return result;
};