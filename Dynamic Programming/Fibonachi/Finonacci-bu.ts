function fibonacciTabulationBackwards(n: number): number {
    const table = Array(n + 2).fill(0);
    table[0] = 0; // Base case 1: fib(0) = 0
    table[1] = 1;
    for (let i = 1; i < n; i++) {
        table[i + 1] += table[i];
        table[i + 2] += table[i];
    }
    return table[n];
}