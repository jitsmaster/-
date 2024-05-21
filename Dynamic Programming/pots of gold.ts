/**
 * Fuses together coins x, M, y, if M >= x and M >= y. This is applied to the whole array. The function's output
 * is either an increasing array, a decreasing array, or a bitonic array. In all cases, we could then use a greedy
 * strategy of just picking the largest of the coins at either end to determine the value of the game.
 * NoteL this is the most important step to achieve O(n) time complexity.
 * @param coins 
 * @param l 
 * @param r 
 * @returns 
 */
function fuse(coins: number[], l: number, r: number): number[] {
	if (r - l < 2) {
		return coins.slice(); // If there are only two or fewer coins, return a copy of the coins array
	}

	const stack: number[] = []; // Create an empty stack to hold the fused coins

	for (let i = l; i <= r; i++) {
		stack.push(coins[i]); // Push each coin onto the stack

		while (stack.length >= 3) { // While there are at least three coins on the stack
			const y = stack.pop()!; // Pop the top coin from the stack and assign it to y
			const M = stack.pop()!; // Pop the next coin from the stack and assign it to M
			const x = stack.pop()!; // Pop the next coin from the stack and assign it to x

			if (x <= M && y <= M) {
				stack.push(x - M + y); // If both x and y are less than or equal to M, fuse them and push the result onto the stack
			} else {
				stack.push(x); // Otherwise, push x, M, and y back onto the stack in the same order
				stack.push(M);
				stack.push(y);
				break; // Exit the while loop
			}
		}
	}

	return stack;
}

function takeLeft(coins: number[], l: number, r: number): boolean {
	const fused = fuse(coins, l, r); // Fuse the coins from index l to r
	return fused[0] > fused[fused.length - 1]; // Return true if the first coin is greater than the last coin in the fused array, otherwise return false
}

function potsOfGold(coins: number[]) {
	return fuse(coins, 0, coins.length - 1); // Fuse all the coins in the array from index 0 to the last index
}

// const coins = [9, 7, 8, 2, 1, 3, 20, 8, 19];
// const coins = [
// 	20, 30, 2, 3, 4, 10, 234, 345, 12, 24, 45, 34, 1, 3, 6, 87, 26, 45, 89, 89, 23, 52, 63, 87, 80, 43, 22, 12, 45, 12, 1, 3
// ];
// console.log(potsOfGold(coins));
