function gridSearchNaive(G: number[][], P: number[][]): string {
	//Complexity:
	//Time - O(n^2 * k ^2) - 4 level loops, 2 for the grid and 2 for the pattern, no efficient
	//Space - O(1)
	const gridRows = G.length;
	const gridCols = G[0].length;
	const patternRows = P.length;
	const patternCols = P[0].length;

	for (let i = 0; i <= gridRows - patternRows; i++) {
		for (let j = 0; j <= gridCols - patternCols; j++) {
			let found = true;

			for (let k = 0; k < patternRows; k++) {
				for (let l = 0; l < patternCols; l++) {
					if (G[i + k][j + l] !== P[k][l]) {
						found = false;
						break;
					}
				}

				if (!found) {
					break;
				}
			}

			if (found) {
				return "YES";
			}
		}
	}

	return "NO";
}

// Example usage:
const grid = [
	[1, 2, 3, 4],
	[5, 6, 7, 8],
	[9, 1, 2, 3],
	[4, 5, 6, 7]
];

const pattern = [
	[2, 3],
	[6, 7]
];

const isPatternFound = gridSearch(grid, pattern);
console.log(isPatternFound); // Output: true