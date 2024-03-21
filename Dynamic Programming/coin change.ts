function coinChange(denominations: number[], amount: number): number {
    //dp bottom up approach
    //always create a cache array of size + 1;
    //the index will be the amount, the value will be the number of ways to make that amount
    //Complexity: 
    //Time: O(n * m) where n is the number of denominations and m is the amount
    //Space: O(m) where m is the amount
    const dp: number[] = new Array(amount + 1).fill(0)
    dp[0] = 1
    for (const coin of denominations) {
        for (let i = coin; i <= amount; i++) {
            //dp[i] is the number of ways to make the amount i
            //dp[i - coin] is the number of ways to make the amount i - coin
            //the algorithm is: add the number of ways to make the amount i - coin to the number of ways to make the amount i
            //note that for each coin value, this operation will be repeated between coin and amount.
            //this is because, if the coin value is 1, then we can make any amount from 1 to amount
            //this algorithm is only possible we allow to use each coin multiple times.
            //if not, we will need to use a different approach
            //refer "canGetExactChangeBu"
            dp[i] += dp[i - coin]
        }
    }
    return dp[amount]
}