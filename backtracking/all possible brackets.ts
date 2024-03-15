function printBracesCombinations(n: number): void {
    const result: string[][] = [];

    //standard backtrack approach
    //difference is: we have to keep track of the number of open and close brackets
    //if open < n, then we can add an open bracket
    //if close < open, then we can add a close bracket
    //so 2 recursive calls, one for open and one for close
    //Complexity:
    //Time: O(2^n) where n is the number of brackets
    //Space: O(2^n) where n is the number of brackets

    function generateCombinations(open: number, close: number, current: string[]): void {
        if (open === n && close === n) {
            result.push([...current]); 
            //really important, must create a copy of the original current,
            //otherwise, we will be directly manipulating the array pushed in the result
            //in later iterations. This is a common mistake in backtracking problems
            return;
        }

        if (open < n) {
            current.push("{");
            generateCombinations(open + 1, close, current);
            current.pop();
        }

        if (close < open) {
            current.push("}");
            generateCombinations(open, close + 1, current);
            current.pop();
        }
    }

    generateCombinations(0, 0, [] as string[]);

}
