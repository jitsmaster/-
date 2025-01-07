'''
 * You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.
 *
 * Evaluate the expression. Return an integer that represents the value of the expression.
 *
 * Note that:
 *
 * - The valid operators are '+', '-', '*', and '/'.
 * - Each operand may be an integer or another expression.
 * - The division between two integers always truncates toward zero.
 * - There will not be any division by zero.
 * - The input represents a valid arithmetic expression in a reverse polish notation.
 * - The answer and all the intermediate calculations can be represented in a 32-bit integer.
 '''

OPERATIONS = {
    '+': lambda x, y: x + y,
    '-': lambda x, y: y - x, 
    '*': lambda x, y: x * y, 
    '/': lambda x, y: int(y / x),
}

class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        #Complexity:
        #Time: O(n) - iterate through all tokens
        #Space: O(n) - stack could potentially hold all the tokens
        stack = []

        for t in tokens:
            if t in OPERATIONS:
                stack.append(OPERATIONS[t](stack.pop(), stack.pop()))
            else:
                stack.append(int(t))
        return stack[0]

