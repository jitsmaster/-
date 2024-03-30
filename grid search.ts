function gridSearch(G: string[], P: string[]): string {
	const rows = G.length;
	const pRows = P.length;

	let matchingPRow = 0;
	let patternCol = -1;

	for (let r = 0; r <= rows - pRows; r++) {
		const patternPos = G[r].indexOf(P[matchingPRow]);

		if (patternPos > -1) {
			if (patternCol < 0) {
				patternCol = patternPos;
			}

			if (patternCol === patternPos) {
				matchingPRow++;
			}
			else {
				//reset the row and col for pattern matching and start over
				matchingPRow = 0;
				patternCol = -1;
			}

			if (matchingPRow === pRows) {
				return "YES";
			}
		}
		else {
			//reset the row and col for pattern matching and start over
			matchingPRow = 0;
			patternCol = -1;
		}
	}

	return "NO";
}

