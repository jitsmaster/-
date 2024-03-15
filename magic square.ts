import { permute } from "./backtracking/permutations";

function isMagicSquare(s: number[]): boolean {
	//check if the array is a magic square
	//we will check if the row, column and diagonal of length n to sum to be the same
	//we will use the first element as the base sum
	const n = Math.sqrt(s.length);
	//use the first row as base sum
	const baseSum = s[0] + s[1] + s[2];

	//check row
	for (let i = 0; i < n; i++) {
		let sum = 0;
		for (let j = 0; j < n; j++) {
			sum += s[i * n + j];
		}
		if (sum !== baseSum) {
			return false;
		}
	}


	//check column
	for (let i = 0; i < n; i++) {
		let sum = 0;
		for (let j = 0; j < n; j++) {
			sum += s[j * n + i];
		}
		if (sum !== baseSum) {
			return false;
		}
	}

	//check diagonal
	let sum = 0;
	for (let i = 0; i < n; i++) {
		sum += s[i * n + i];
	}
	if (sum !== baseSum) {
		return false;
	}

	sum = 0;
	for (let i = 0; i < n; i++) {
		sum += s[(n - 1) * (i + 1)];
	}
	if (sum !== baseSum) {
		return false;
	}

	return true;
}


export function formingMagicSquare(s: number[][]): number {
	//brute force with backtracking first to find all possible magic square
	//we will do flat array to make it easier to iterate
	const flat = s.flat();
	const permutations = permute([1, 2, 3, 4, 5, 6, 7, 8, 9]);
	//get magic square out of it, it needs to meet the criteria of row, column and diagonal of length n to sum to be the same
	//we will filter out all permutations that does not meet the criteria
	//we will also filter out all permutations that does not have the same sum as the original flat array
	const magicSquares = permutations.filter((p) => {
		return isMagicSquare(p);
	});

	console.info(`permutes: ` + magicSquares.length)

	//go through all permutations and check how much it takes to convert the flat into it.
	let minCost = Infinity;

	magicSquares.forEach((p) => {
		minCost = Math.min(minCost, flat.reduce((acc, val, idx) => {
			return acc + Math.abs(val - p[idx]);
		}, 0));
	});

	return minCost;

}
