function coinChange(coins: number[], amount: number): number {
    //dynamic programming
    //we have unlimited amount of each coin
    //so we can use bottom-up approach
    //we start from 1 to amount
    //for each amount, we check all the coins
    //if the coin is less than or equal to the amount
    //we can use the coin to make the amount
    //we store the minimum number of coins needed to make the amount
    //if the amount is not possible to make, we store Infinity
    //if the amount is possible to make, we store the minimum number of coins needed
    //the final result is the last element of the dp array

    //Complexity:
    //Time: O(n * m) - we are iterating through the amount and the coins
    //Space: O(n) - the size of the dp array
    
    const dp: number[] = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}