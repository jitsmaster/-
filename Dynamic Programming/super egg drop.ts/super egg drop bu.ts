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
function superEggDrop(K: number, N: number): number {
    // Create a 2D array to store the minimum number of moves for each egg
    // and floor combination
    // the size of the array is K + 1 x N + 1
    // row count is K + 1 because we need to consider the case of 0 eggs
    // column count is N + 1 because we need to consider the case of 0 floors
    const dp: number[][] = Array.from({ length: K + 1 }, 
        () => Array(N + 1).fill(0));

    // Base cases: If there are no floors or only one floor, the number of moves is equal to the number of floors
    for (let i = 1; i <= K; i++) {
        dp[i][0] = 0;
        dp[i][1] = 1;
    }

    // Base case: If there is only one egg, the number of moves is equal to the number of floors
    for (let j = 1; j <= N; j++) {
        dp[1][j] = j;
    }

    // Fill the rest of the dp array using dynamic programming
    for (let i = 2; i <= K; i++) {
        for (let j = 2; j <= N; j++) {
            //start with max number of moves
            dp[i][j] = Infinity;
            //loop through all floors
            for (let x = 1; x <= j; x++) {
                // Egg breaks on the floot, so we need to check below floors
                const broken = dp[i - 1][x - 1]; 
                // Egg doesn't break on the floor, so we need to check above floors
                const notBroken = dp[i][j - x]; 
                // Take the maximum of the two cases and add 1 for the current move
                dp[i][j] = Math.min(dp[i][j], 1 + Math.max(broken, notBroken));
            }
        }
    }

    // The minimum number of moves required is stored in dp[K][N]
    return dp[K][N];
}