function fibonacciTabulationBackwards(n: number): number {
    // Create a table to store the results of subproblems
    // The size of the table is n + 2, reason being we need to consider 
    // the base cases of 0 and 1, and we are going with backwards logic
    // we are generating next 2 values from the current value
    const table = Array(n + 2).fill(0);

    table[0] = 0; // Base case 1: fib(0) = 0
    table[1] = 1; // Base case 2: fib(1) = 1

    for (let i = 1; i < n; i++) {
        //Reversed Fibonacci equation:
        //we need current value to generate next 2 values
        table[i + 1] += table[i];
        table[i + 2] += table[i];
    }
    return table[table.length - 1];
}