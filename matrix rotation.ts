//rotating a matrix by 90 degrees
//input: 1 2 3
//       4 5 6
//       7 8 9
//output: 7 4 1
//        8 5 2
//        9 6 3
//the idea is to rotate the matrix in layers
//I do a little different, basically each column will turn into reversed row

function rotateMatrixReturnNew(matrix: number[][]): number[][] {
    //Complexity Analysis:
    //Time complexity: O(n^2), where n is the number of elements in the matrix
    //Space complexity: O(n^2), where n is the number of elements in the matrix
    
    const newMatrix: number[][] = [];
    for(let col = 0; col < matrix[0].length; col++) {
        const newRow  = [] as number[];
       //gather the row
        for(let row = 0; row < matrix.length; row++) {
           const element = matrix[row][col]; 
           newRow.push(element);
        }
        //reverse the row
        newRow.reverse();
        newMatrix.push(newRow);
    }

    return newMatrix;
}

function rotateMatrixInPlace(matrix: number[][]): void {

    //Complexity Analysis
    //Time complexity: O(n^2), where n is the number of elements in the matrix
    //Space complexity: O(1), constant space needed to store the current element

    //transpose the matrix
    for(let row = 0; row < matrix.length; row++) {
        for(let col = row; col < matrix[0].length; col++) {
            //swap the elements, row to column and column to row
            [matrix[row][col], matrix[col][row]] = [matrix[col][row], matrix[row][col]];
        }
    }

    //reverse each row, 90 degrees rotation clockwise will reverse each row
    //need to reverse them back
    for(let row = 0; row < matrix.length; row++) {
        matrix[row].reverse();
    }
}