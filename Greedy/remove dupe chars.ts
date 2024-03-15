function removeDuplicateLetters(s: string): string {
    /**
     * The time complexity of this function is O(n), where n is the length of the input string s. 
     * This is because we iterate through the string twice: once to count the frequency of each character, 
     * and once to build the result stack. Both iterations have a linear time complexity.
     * 
     * The space complexity of this function is O(n), where n is the length of the input string s. 
     * This is because we use three data structures: the result stack, 
     * the frequency map, and the in-stack map. 
     * The space required by these data structures grows with the size of the input string.
     */
    // Create a stack to store the result
    const stack: string[] = [];
    // Create a map to keep track of the frequency of each character
    const freqMap: Map<string, number> = new Map();
    // Create a map to keep track of whether a character is already in the stack
    const inStackMap: Map<string, boolean> = new Map();

    // Count the frequency of each character in the string
    for (const char of s) {
        freqMap.set(char, (freqMap.get(char) || 0) + 1);
    }

    // Iterate through each character in the string
    for (const char of s) {
        // Decrease the frequency of the character in the frequency map
        freqMap.set(char, (freqMap.get(char) || 0) - 1);

        // If the character is already in the stack, skip it
        if (inStackMap.get(char)) {
            continue;
        }

        // While the character is smaller than the top of the stack and the top of the stack still has remaining occurrences
        while (stack.length > 0 
            && char < stack[stack.length - 1] 
            && (freqMap.get(stack[stack.length - 1]) || 0)  > 0) {
            // Remove the top of the stack
            const top = stack.pop();
            // Mark the character as not in the stack
            inStackMap.set((top as string), false);
        }

        // Add the character to the stack
        stack.push(char);
        // Mark the character as in the stack
        inStackMap.set(char, true);
    }

    // Return the result as a string
    return stack.join('');
}
