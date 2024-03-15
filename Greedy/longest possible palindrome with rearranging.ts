function longestPalindrome(s: string): number {
    //since we can rearrange the string, we can use a greedy approach to find the longest palindrome
    //we can use a set to store the characters that have an odd count
    //if the character is already in the set, we remove it and increment the result by 2
    //at the end, if the set is not empty, we add 1 to the result
    let result = 0;
    const set = new Set<string>();
    for (const char of s) {
        //set has the character already, we remove it and increment the result by 2
        //since a pair of the character can be used to form a palindrome
        if (set.has(char)) {
            set.delete(char);
            result += 2;
        } else {
            //if not found, add it to set
            set.add(char);
        }
    }

    //if the set is not empty, we add 1 to the result
    if (set.size > 0) {
        result++;
    }

    return result;
}