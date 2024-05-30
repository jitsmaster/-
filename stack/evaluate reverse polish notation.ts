/**
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
 */
function evalRPN(tokens: string[]): number {
	//use stack to track the last operation result
	//note the operator will cover the previous 2 numbers, most important
	//concept on reverse polish notation.
	const stack: number[] = [];
	for (let chr of tokens) {
		const num = parseInt(chr, 10);
		if (!isNaN(num)) {
			//push number into stack
			stack.push(num);
		}
		else {
			//if operator, popup previous 2 numbers and calculate
			const n2 = stack.pop()!;
			const n1 = stack.pop()!;
			let newVal;
			if (chr === "/") {
				newVal = Math.trunc(n1 / n2); //most important part, it's not flooring
				//but truncation, which for negative is actual ceiling.
			}
			else if (chr === "*") {
				newVal = n1 * n2;
			}
			else if (chr === "-") {
				newVal = n1 - n2;
			}
			else if (chr === "+") {
				newVal = n1 + n2;
			}
			else {
				throw new Error("Invalid operator");
			}

			//push in the new val
			stack.push(newVal);
		}
	}

	return stack.pop()!;
};