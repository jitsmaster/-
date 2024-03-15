function extraLongFactorials(n: number): void {
    // need to rely on bigint to handle large numbers, and print correctly
    let f = BigInt(n);
    while(n > 1) {
        n--;
        f = f * BigInt(n)
    }
    
    process.stdout.write(f.toString())
}