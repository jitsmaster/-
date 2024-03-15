function isMatch(s: string, p: string): boolean {
    //time complexity is O(n*m) where n is the length of the string and m is the length of the pattern
    //space complexity is O(n) where n is the length of the string
    //this approach is much faster and cheaper than DP bottom-up
    let stringIndex = 0;
    let patternIndex = 0;
    let starIndexInPattern = -1;
    let matchIndexInString = 0;

    while (stringIndex < s.length) {
        //exact character match, or single character ? match, increment both indexes
        if (patternIndex < p.length && (p[patternIndex] === '?' || p[patternIndex] === s[stringIndex])) {
            stringIndex++;
            patternIndex++;
        } else if (patternIndex < p.length && p[patternIndex] === '*') {
            //if we find a star, we keep track of the star index and the string index
            //we also increment the pattern index only
            starIndexInPattern = patternIndex;
            matchIndexInString = stringIndex;
            patternIndex++;
        } else if (starIndexInPattern !== -1) {
            //if we find a mismatch, we go back to the last star, backtracking the string index
            //and we increment the pattern index only
            patternIndex = starIndexInPattern + 1;
            matchIndexInString++;
            stringIndex = matchIndexInString;
        } else {
            return false;
        }
    }

    //if there are any * left in the pattern, we skip them
    while (patternIndex < p.length && p[patternIndex] === '*') {
        patternIndex++;
    }

    return patternIndex === p.length;
}
