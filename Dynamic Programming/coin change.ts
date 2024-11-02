function coinChange(coins: number[], amount: number): number {
    /* `const max = amount + 1;` is initializing a variable `max` with a value that is one more than
    the `amount` provided to the `coinChange` function. This value is used in the dynamic
    programming approach to set up an upper limit for the array `dp`. By setting `max` to `amount +
    1`, the array `dp` will have enough space to store the results for amounts from 0 to the given
    `amount`. */
    const max = amount + 1;


    /* `const dp: number[] = new Array(max).fill(max);` is initializing an array `dp` of length `max`
    with each element filled with the value `max`. This array is used in the dynamic programming
    approach to store the minimum number of coins needed to make up each amount from 0 to the given
    `amount`. By filling the array with `max` initially, it sets up the initial values for
    comparison in the dynamic programming algorithm. */
    const dp: number[] = new Array(max).fill(max);
    /* `dp[0] = 0;` is initializing the first element of the `dp` array to 0. In the context of the
    `coinChange` function, this step is setting up the base case for the dynamic programming
    approach. By setting `dp[0]` to 0, it indicates that the minimum number of coins needed to make
    up an amount of 0 is 0 (since no coins are needed to make up 0). This initialization is crucial
    for the dynamic programming algorithm to work correctly and calculate the minimum number of
    coins needed for other amounts based on this base case. */
    dp[0] = 0;


    /* The line `for (let subAmount = 1; subAmount <= amount; subAmount++) {` is setting up a loop that
    iterates over each subAmount from 1 up to the given `amount`. This loop is a key part of the
    dynamic programming algorithm implemented in the `coinChange` function. */
    for (let subAmount = 1; subAmount <= amount; subAmount++) {
        /* The line `for (const coin of coins) {` is setting up a loop that iterates over each coin in
        the `coins` array. This loop is used in the dynamic programming algorithm implemented in the
        `coinChange` function to consider each coin as a potential candidate for making up the
        current subAmount being processed. By iterating over each coin in the `coins` array, the
        algorithm can evaluate the impact of including or excluding each coin in the calculation of
        the minimum number of coins needed to make up the given amount. */
        for (const coin of coins) {
            const leftover = subAmount - coin;
            if (leftover < 0)
                continue;
            /* `dp[subAmount] = Math.min(dp[subAmount], dp[subAmount - coin] + 1);` is a crucial step
            in the dynamic programming algorithm implemented in the `coinChange` function. */
            dp[subAmount] = Math.min(dp[subAmount], dp[subAmount - coin] + 1);
        }
    }

    return dp[amount] === max ? -1 : dp[amount];
}