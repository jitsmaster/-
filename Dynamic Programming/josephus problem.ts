// Recursive function to find the winner in the Josephus problem
function findTheWinner(n: number, k: number): number {
    // Base case: If there is only one person left, winner!!!
    if (n === 1) {
        return 1;
    } else {
        // Recursive case: 
        // find the winner in remaining n-1 people after kth person is killed
        // add k-1 to the result to get the winner in n people
        // then take the modulo of n, since the k could be greater than n
        // last add 1 to compensate for 0 based index
        return (findTheWinner(n - 1, k) + k - 1) % n + 1;
    }
}