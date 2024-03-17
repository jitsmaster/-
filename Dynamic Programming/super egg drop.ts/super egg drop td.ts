// You are given k identical eggs and you have access to a building with n floors 
// labeled from 1 to n.

// You know that there exists a floor f where 0 <= f <= n such that any egg dropped 
// at a floor higher than f will break,
// and any egg dropped at or below floor f will not break.

// Each move, you may take an unbroken egg and drop it from any floor x 
// (where 1 <= x <= n).
// If the egg breaks, you can no longer use it. However, if the egg does not break,
// you may reuse it in future moves.

// Return the minimum number of moves that you need to determine with certainty
// what the value of f is.
function superEggDropTd(k: number, n: number): number {
    //we will use recursion + memoization to solve this problem

    //create a 2D array to store the results of subproblems,
    //dp principle: both dimension are length + 1 dp[i][j] represents the minimum number of moves to test i eggs and j floors
    //initialize the array with -1
    const memo: number[][] = Array.from({ length: k + 1 }, () => Array(n + 1).fill(-1));

    //recursive helper function
    function recurse(k: number, n: number): number {
        //if we have only one egg, we have to test all floors
        if (k === 1) return n;

        //if we have only one floor, we have to test only one floor
        if (n === 0) return 0;

        //if we have already solved this subproblem, return the result
        if (memo[k][n] !== -1) return memo[k][n];

        //initialize the result
        let result = Infinity;

        //loop through all floors
        for (let i = 1; i <= n; i++) {
            //we have two choices at each floor
            //1. egg breaks, we have k - 1 eggs and i - 1 floors to test
            //2. egg doesn't break, we have k eggs and n - i floors to test
            //we take the maximum of the two, since we want to minimize the worst case
            const max = Math.max(recurse(k - 1, i - 1), recurse(k, n - i)) + 1;
            //update the result
            result = Math.min(result, max);
        }

        //store the result in the memo
        memo[k][n] = result;
        return result;
    }

    return recurse(k, n);
};