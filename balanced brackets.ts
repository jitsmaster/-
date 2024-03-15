/**
 * Checks if the given string has balanced brackets.
 * 
 * @param s The string to check for balanced brackets.
 * @returns True if the brackets are balanced, false otherwise.
 */
function isBalanced(s: string) {
    //use stack to figure out if the brackets are balanced
    let stack: string[] = [];

    //create a map to store the brackets
    //keys are left brackets and values are right brackets
    let map = new Map<string, string>([
        ["(", ")"],
        ["[", "]"],
        ["{", "}"]
    ]);

    s.split("").forEach((char) => {
        //if the character is a left bracket, push it to the stack
        if (map.has(char)) {
            stack.push(char);
        } else {
            const stackTop = stack[stack.length - 1];
            if (char === map.get(stackTop)) {
                //if the character is a right bracket, pop the top element from the stack
                stack.pop();
            }
        }
    });

    //if stack is empty, then all brackets are balanced
    return stack.length === 0;
}