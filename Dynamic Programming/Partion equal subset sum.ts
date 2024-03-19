function canPartitionBacktrack(nums: number[]): boolean {
    //backtracking
    //the problem is to find if we can partition the array into two subsets with equal sum
    //this is similar to the 0/1 knapsack problem
    //we can use backtracking to solve this problem
    //the time complexity of this problem is O(2^n)
    //the space complexity of this problem is O(n)

    //we can solve this problem using the following steps:
    //1. calculate the sum of all the elements in the array
    //2. if the sum is odd, then we cannot partition the array into two subsets with equal sum
    //3. if the sum is even, then we can partition the array into two subsets with equal sum
    //4. we can use backtracking to find the two subsets with equal sum
    //5. we can start by finding the first subset with sum equal to sum/2
    //6. then we can find the second subset with sum equal to sum/2
    //7. if we can find both the subsets, then we can return true

    const totalSum = nums.reduce((acc, curr) => acc + curr, 0);
    if (totalSum % 2 !== 0) {
        return false;
    }

    const targetSum = totalSum / 2;
    let result = false;

    function backtrack(start: number, currentSum: number) {
        if (currentSum === targetSum) {
            result = true;
            return;
        }

        for (let i = start; i < nums.length; i++) {
            if (currentSum + nums[i] <= targetSum) {
                //step 1: add the number to current sum
                currentSum += nums[i];
                //step 2: backtrack, for next position
                backtrack(i + 1, currentSum);
                //step 3: remove the number from current sum, this line is reached when step 2 of recursive backtracking didn't produce result
                currentSum -= nums[i];
            }
        }
    }

    backtrack(0, 0);
    return result;
};

function canPartitionTopDown(nums: number[]): boolean {
    // top-down with memoization
    // the problem is to find if we can partition the array into two subsets with equal sum
    // this is similar to the 0/1 knapsack problem
    // we can use top-down with memoization to solve this problem
    // the time complexity of this problem is O(n * sum)
    // the space complexity of this problem is O(n * sum)

    const totalSum = nums.reduce((acc, curr) => acc + curr, 0);
    if (totalSum % 2 !== 0) {
        return false;
    }

    const targetSum = totalSum / 2;
    const memo: boolean[][] = [];

    function solveSubProblem(index: number, currentSum: number): boolean {
        if (currentSum === targetSum) {
            return true;
        }

        if (index >= nums.length || currentSum > targetSum) {
            return false;
        }

        if (memo[index] && memo[index][currentSum] !== undefined) {
            return memo[index][currentSum];
        }

        const include = solveSubProblem(index + 1, currentSum + nums[index]);
        const exclude = solveSubProblem(index + 1, currentSum);

        memo[index] = memo[index] || [];
        memo[index][currentSum] = include || exclude;

        return memo[index][currentSum];
    }

    return solveSubProblem(0, 0);
};

function canPartitionBottomUp(numbers: number[])   : boolean {
    // bottom-up with tabulation
    // the problem is to find if we can partition the array into two subsets with equal sum
    // this is similar to the 0/1 knapsack problem
    // we can use bottom-up with tabulation to solve this problem
    // the time complexity of this problem is O(n * sum)
    // the space complexity of this problem is O(n * sum)

    const totalSum = numbers.reduce((acc, curr) => acc + curr, 0);
    if (totalSum % 2 !== 0) {
        return false;
    }

    const targetSum = totalSum / 2;
    //construct the memoization table
    //row axis represents the numbers index
    //column axis represents the sum
    const dp: boolean[][] = Array.from({ length: numbers.length + 1 }, () => Array(targetSum + 1).fill(false));

    //first colunm is true, because we can always get 0 sum with no elements
    for (let i = 0; i <= numbers.length; i++) {
        dp[i][0] = true;
    }

    for (let i = 1; i <= numbers.length; i++) {
        for (let j = 1; j <= targetSum; j++) {
 
            if (j >= numbers[i - 1]) {
                //current number is less then or equal to the current sum
                //we have two options, either to include the number or exclude the number
                //if we include the number, then the result is same as the result of the previous subproblem
                //if we exclude the number, then the result is previous subproblem result with the same sum
                //so the result is the logical OR of the two options
                dp[i][j] = dp[i - 1][j] 
                    || dp[i - 1][j - numbers[i - 1]];
            } else {
                //current number is greater than the current sum
                //we can only exclude the number
                //so the result is same as the previous result
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    return dp[numbers.length][targetSum];
}