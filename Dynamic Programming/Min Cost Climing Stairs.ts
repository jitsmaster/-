function minCostClimbingStairs(cost: number[]): number {
    // Create a table to store the results of subproblems
    // The size of the table is n + 1, reason being we need to consider
    // the base case of 0, and we are going with forward logic

    //Complexity:
    // Time: O(n) - we are iterating through the cost array once
    // Space: O(n) - we are using an array of size n to store the results of subproblems

    const n = cost.length;
    const dp: number[] = [];

    // Base cases
    dp[0] = cost[0];
    dp[1] = cost[1];

    // Fill the table with minimum cost up to n
    for (let i = 2; i < n; i++) {
        // Minimum cost equation:
        // dp[i] = cost[i] + min(dp[i - 1], dp[i - 2])
        dp[i] = cost[i] + Math.min(dp[i - 1], dp[i - 2]);
        //reason: we can either come from i - 1 or i - 2, so we take the minimum of the two
    }

    // The minimum cost to reach the top is the minimum of the last two elements
    //reason: we can either come from the last step or the step before it
    return Math.min(dp[n - 1], dp[n - 2]);
};