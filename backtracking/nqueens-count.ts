function totalNQueens(n: number): number {
    /**
    * Complexity
       Time complexity:
       O(n2∗n!)
    
       Space complexity:
       O(n)
    */
    let count = 0;
    const board: number[] = [];


    function isSafe(colNum: number) {
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

    function backtrack() {
        if (board.length === n) {
            //board is full, add the result to the result array
            count++;
            return;
        }

        for (let col = 0; col < n; col++) {
            if (isSafe(col)) {
                //step1: push the current option to the board
                board.push(col);
                //step2: backtrack
                backtrack();
                //step3: undo the step1 by popping the last element from the board, this line 
                // is reached, when step2 of recursive backtracking didn't product  result
                board.pop();
            }
        }
    };

    backtrack();

    return count;
}