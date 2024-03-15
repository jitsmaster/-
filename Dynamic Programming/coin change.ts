function coinChange(denominations: number[], amount: number): number {
    //dp bottom up approach
    //always create a cache array of size + 1;
    //the index will be the amountm, the value will be the number of ways to make that amount
    //Complexity: 
    //Time: O(n * m) where n is the number of denominations and m is the amount
    //Space: O(m) where m is the amount
    const dp: number[] = new Array(amount + 1).fill(0)
    dp[0] = 1
    for (const coin of denominations) {
        for (let i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin]
        }
    }
    return dp[amount]
}