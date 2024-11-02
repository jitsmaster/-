class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        # Analysis:
        # Same building sub problems and solving them to get the final answer.
        # We increment amount by 1 for the sub problems.
        # We iterate over the coins, imagine each coin value can be used to make up the amount. (used once)

        # Complexity:
        # Time: O(n * m) where n is the amount and m is the number of coins - we are iterating over each sub-amount from 1 to the target amount and considering each coin denomination available. 2 loops
        # Space: O(n) where n is the amount - we are storing the minimum number of coins needed to make up each sub-amount from 1 to the target amount.

        # The line `dp = [amount + 1] * (amount + 1)` is initializing the dynamic programming (dp)
        # array with a list of length `amount + 1`, where each element in the list is initialized to
        # the value `amount + 1`. This is a common technique to initialize an array with a default
        # value in Python.
        dp = [amount + 1] * (amount + 1)
        # `dp[0] = 0` is setting the value at index 0 in the dynamic programming array `dp` to 0. In
        # this context, it is initializing the base case for the dynamic programming solution. This
        # step is necessary because it establishes the starting point for the dynamic programming
        # algorithm to build upon when calculating the minimum number of coins needed to make up the
        # amount.
        dp[0] = 0
        # The line `for subAmount in range(1, amount + 1):` is a loop that iterates over each
        # sub-amount from 1 to the target amount (inclusive). In the context of the `coinChange`
        # method, this loop is used to calculate the minimum number of coins needed to make up each
        # sub-amount from 1 to the target amount.
        for subAmount in range(1, amount + 1):
            # The line `for coin in coins:` is a loop that iterates over each coin value in the
            # `coins` list. In the context of the `coinChange` method, this loop is used to consider
            # each coin denomination available when calculating the minimum number of coins needed to
            # make up each sub-amount from 1 to the target amount.
            for coin in coins:
                leftover = subAmount - coin
                # The line `if leftover < 0:` in the code snippet provided is checking if the variable
                # `leftover` is less than 0.
                if leftover < 0:
                    continue
                # The line `dp[subAmount] = min(dp[subAmount], 1 + dp[leftover])` in the `coinChange`
                # method is updating the value at index `subAmount` in the dynamic programming array
                # `dp`.
                # since dp[leftover] was solved already.
                # reason for adding 1 is because we are using one coin, which is the coin itself, if being used.
                # so we add 1 to the number of coins needed to make up the leftover amount.
                dp[subAmount] = min(dp[subAmount], 1 + dp[leftover])

        return dp[amount] if dp[amount] != amount + 1 else -1
