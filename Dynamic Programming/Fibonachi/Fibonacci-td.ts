function fibonacciTopdown(n: number) {
    const memo: number[] = [];

    function fibRecurse(num: number) {
        if (num < 2) {
            return num;
        }

        if (num < 1) {
            return 0;
        }

        if (memo[num]) {
            return memo[num];
        }

        memo[num] = fibRecurse(num - 1) + fibRecurse(num - 2);

        return memo[num];
    }

    fibRecurse(n);
    return memo;
}