//this is just a tricky question
//the goal is to avoid enumeration and use basic math to solve the problem
//and the key is that sum of 1 to n is always n * (n + 1) / 2
function findMissingNumber(arr: number[]): number {
    let n = arr.length + 1;

    //sum of of expect from 1 to n, is always n * (n + 1) / 2
    let expectedSum = n * (n + 1) / 2;
    let actualSum = arr.reduce((a, b) => a + b);
    return expectedSum - actualSum;
}