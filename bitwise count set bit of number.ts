function countSetBitOfNumber(n: number): number {
    let count = 0;
    while (n) {
        //approach 1: n & (n - 1) will remove the rightmost set bit
        n = n & (n - 1);
        count++;

        //approach 2: bitwise and with 1, if the result is 1, then the rightmost bit is set
        //if it is, then the result stays the same
        //move the sequence to the right by 1 every step
        // count += n & 1;
        // n >>= 1;
    }
    return count;
}