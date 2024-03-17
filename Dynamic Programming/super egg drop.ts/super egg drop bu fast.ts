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
function superEggDrop(k: number, n: number): number {
    // only 1 egg, we just need to return number of floors
    // since that's the worst case scenario we need try
    if (k === 1) {
        return n;
    }

    //the dp array stores this min numbers of floors for each egg.
    let dp: number[] = Array(k + 1).fill(0);

    //loop through all floors
    for (let floor = 1; ; ++floor) {
        //loop through all eggs reversed
        //for each egg, we add 1 and the previous egg's number of floors to it's value
        //For 1st floor and kth egg, array not filled yet
        //so dp[k] = 0 + 0 + 1 = 1;
        //For k-1th egg, dp[k-2] not filled, so dp[k-1] = 0 + 0 + 1
        //For 2nd floor and kth egg, dp[k-1] is 1
        //dp[k] = 1 + 1 + 1 = 3
        //For 2nd egg, d[k-1] = 1 + 1 + 1 = 3
        //For 3rd floor,
        //dp[k] = 3 + 3 + 1 etc.
        for (let egg = k; egg > 0; --egg) {
            dp[egg] += dp[egg - 1] + 1;
        }

        //unlike other bottom up approach, we don't need to store all the values
        //just need to return the floor number
        //when the number of floors is greater than or equal to n
        //for the first egg
        if (dp[k] >= n) {
            return floor;
        }
    }
}