/**
 * Checks if the given string has balanced brackets.
 * 
 * @param s The string to check for balanced brackets.
 * @returns True if the brackets are balanced, false otherwise.
 */
function isBalanced(s: string) {
	//Complexity:
	//Time complexity: O(n) - we iterate through the string once
	//Space complexity: O(n) - we store the stack of brackets

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

function isBalancedReverseLookup(s: string) {
	//this is similar to the last solution, but we reverse the map
	//this way, we can check if the character is a right bracket
	//then we can look up the left bracket in the map
	//same complexity as the last solution, just a different way to solve it
	const map = new Map<string, string>([[")", "("], ["}", "{"], ["]", "["]]);

	const stack = [s[0]];
	//push to stack
	for (let i = 1; i < s.length; i++) {
		const end = stack[stack.length - 1];
		const chr = s[i];
		if (map.has(chr)) {
			const lChr = map.get(chr);
			if (lChr === end) {
				//pop, and jump to next iteration
				stack.pop();
				continue;
			}
		}
		stack.push(chr);
	}

	return stack.length === 0;
}