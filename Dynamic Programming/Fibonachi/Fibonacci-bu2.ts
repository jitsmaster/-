function fibonacci(n: number): number {
  // Create a table to store the results of subproblems
  // The size of the table is n + 1, reason being we need to consider
  // the base cases of 0 and 1, and we are going with forward logic
  // we are generating current value from 2 previous values.
  // which is easier to understand, since it's exact Fibonacci equation
  // instead of reverse of it
  const fibTable: number[] = [];

  // Base cases
  fibTable[0] = 0;
  fibTable[1] = 1;

  // Fill the table with fibonacci numbers up to n
  for (let i = 2; i <= n; i++) {
    //Fibonacci equation:
    //fib(n) = fib(n - 1) + fib(n - 2)
    fibTable[i] = fibTable[i - 1] + fibTable[i - 2];
  }

  return fibTable[n];
}

