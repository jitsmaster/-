function fibonacci(n: number): number {
  const fibTable: number[] = [];

  // Base cases
  fibTable[0] = 0;
  fibTable[1] = 1;

  // Fill the table with fibonacci numbers up to n
  for (let i = 2; i <= n; i++) {
    fibTable[i] = fibTable[i - 1] + fibTable[i - 2];
  }

  return fibTable[n];
}

