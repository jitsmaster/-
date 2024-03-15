// function queensAttack(n: number, k: number, r_q: number, c_q: number, obstacles: number[][]): number {
//     function sign(num: number) {
//         return num > 0 ? 1 : (num < 0 ? -1 : 0);
//     }

//     // Use 3x3 array to store the direction of the obstacles
//     const directions = (new Array(3)).map(() => new Array(3).fill(Infinity));

//     directions[1][1] = 0; // not used

//     directions[0][1] = n - r_q; // up
//     directions[1][2] = n - c_q; // right
//     directions[1][0] = c_q - 1; // left
//     directions[2][1] = r_q - 1; // down

//     directions[0][0] = Math.min(directions[0][1], directions[1][0]); // up left
//     directions[0][2] = Math.min(directions[0][1], directions[1][2]); // up right
//     directions[2][0] = Math.min(directions[2][1], directions[1][0]); // down left
//     directions[2][2] = Math.min(directions[2][1], directions[1][2]); // down right

//     for (let i = 0; i < obstacles.length; i++) {
//         const [r, c] = obstacles[i];
//         const diffr = r - r_q;
//         const diffc = c_q - c;

//         if (!diffc || !diffr || Math.abs(diffc) === Math.abs(diffr)) {
//             // If the obstacle is in the same row, then the minimum distance is the difference between the column of the obstacle and the column of the queen
//             // If the obstacle is in the same column, then the minimum distance is the difference between the row of the obstacle and the row of the queen
//             // If the obstacle is in the diagonal, then the minimum distance is the difference between the row and the column of the obstacle and the queen
//             // The algorithm is to find the minimum distance between the queen and the obstacle
//             directions[1 - sign(diffr)][1 - sign(diffc)] = Math.min(
//                 directions[1 - sign(diffr)][1 - sign(diffc)], 
//                 Math.max(Math.abs(diffr), Math.abs(diffc)) - 1
//             );
//         }
//     }

//     // Iterate through the 8 directions to sum up
//     let sum = 0;
//     for (let i = 0; i < 3; ++i) {
//         for (let j = 0; j < 3; ++j) {
//             sum += directions[i][j];
//         }
//     }

//     return sum;
// }
/**
 * Given the queen's position and the locations of all the obstacles, 
 * find and print the number of squares the queen can attack 
 * from her position at . In the board above, there are  such squares.
 * @param n 
 * @param k 
 * @param r_q 
 * @param c_q 
 * @param obstacles 
 * @returns 
 */
function queensAttack2(n: number, k: number, r_q: number, c_q: number, obstacles: number[][]): number {
    //Complexity:
    //Time complexity: O(k) - where k is the number of obstacles
    //Space complexity: O(1) - we use a 3x3 array to store the possible moves count for each direction

    // Use 3x3 array to store the possible moves count for each direction
    //1,1 is where the queen is, all other cells are for each direction the queen could move
    //we we do is to add the number of moves for each direction
    const moves = (new Array(3)).map(() => new Array(3).fill(Infinity));

    moves[1][1] = 0; // the queen's position, not used

    moves[0][1] = n - r_q; // up
    moves[1][2] = n - c_q; // right
    moves[1][0] = c_q - 1; // left
    moves[2][1] = r_q - 1; // down

    moves[0][0] = Math.min(moves[0][1], moves[1][0]); // up left
    moves[0][2] = Math.min(moves[0][1], moves[1][2]); // up right
    moves[2][0] = Math.min(moves[2][1], moves[1][0]); // down left
    moves[2][2] = Math.min(moves[2][1], moves[1][2]); // down right

    //helper function to get the sign of a number
    //if the number is positive, return 1
    //if the number is negative, return -1
    //if the number is 0, return 0
    function sign(num: number) {
        return num > 0 ? 1 : (num < 0 ? -1 : 0);
    }

    for (let i = 0; i < obstacles.length; i++) {
        const [r, c] = obstacles[i];
        const diffr = r - r_q;
        const diffc = c_q - c;

        if (!diffc || !diffr || Math.abs(diffc) === Math.abs(diffr)) {
            // If the obstacle is in the same row, then the minimum distance is the difference between the column of the obstacle and the column of the queen
            // If the obstacle is in the same column, then the minimum distance is the difference between the row of the obstacle and the row of the queen
            // If the obstacle is in the diagonal, then the minimum distance is the difference between the row and the column of the obstacle and the queen
            // The algorithm is to find the minimum distance between the queen and the obstacle
            moves[1 - sign(diffr)][1 - sign(diffc)] = Math.min(
                moves[1 - sign(diffr)][1 - sign(diffc)], 
                Math.max(Math.abs(diffr), Math.abs(diffc)) - 1
            );

            //this algorithm is to find the minimum distance between the queen and the obstacle for each direction
        }
    }

    // Iterate through the 8 directions to sum up
    let sum = 0;
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            sum += moves[i][j];
        }
    }

    return sum;
}



