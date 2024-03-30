// Given a grid of size , each cell in the grid is either  or .

// A valid plus is defined here as the crossing of two segments (horizontal and vertical) of equal lengths.
// These lengths must be odd, and the middle cell of its horizontal segment must cross the middle cell of its vertical segment.
// Find the two largest valid pluses that can be drawn on  cells in the grid, and return an integer denoting the maximum product 
// of their areas.
function twoPluses(grid: string[]): number {

	//2 scenarios: 
	//1. The cell is a G with at least 1 side blocked by B
	//2. The cell is a G that extends out to all 4 nodes equally
	let plusSizes = [] as number[];
	const coords = [] as { y: number, x: number }[];

	//don't revisted the same row and column that has plus in it again
	const visitedRows = new Set<number>();
	const visitedCols = new Set<number>();

	for (let r = 1; r < grid.length - 1; r++) {
		for (let c = 1; c < grid[0].length - 1; c++) {
			if (visitedRows.has(r) || visitedCols.has(c))
				continue;

			if (grid[r][c] === 'G') {

				//first scenario no need to check, since anything times 1 is still the same
				//only need to check for true crosses
				//we will start from 1, and keep expanding the plus
				let size = 0;
				const neighborCoords = [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]];

				let expandingNeighors = [...neighborCoords];
				let overlapped = false;
				//the while loop will keep on expanding the plus
				while (expandingNeighors.every(([nr, nc]) => nr >= 0
					&& nr <= grid.length - 1
					&& nc >= 0
					&& nc <= grid[0].length - 1
					&& grid[nr][nc] === 'G')
					&& !overlapped) {

					console.info(`expandingNeighors: ${expandingNeighors.map(c => `{${c[0]}, ${c[1]}}`).join(" - ")} - size: ${size + 1}`);

					//if all the neighbors are G, then we can expand the plus
					//by 1 in all 4 directions						
					expandingNeighors.forEach((item, i) => {
						switch (i) {
							case 0:
								item[0]--;
								break;
							case 1:
								item[0]++;
								break;
							case 2:
								item[1]--;
								break;
							case 3:
								item[1]++;
								break;
						}

						//prevent overlapping, since one cross will cut off the other
						if (visitedRows.has(item[0]) || visitedCols.has(item[1]))
							overlapped = true;
					});
					size += 1;
				}

				//mark the visited rows and cols
				if (size > 0) {
					visitedRows.add(r);
					visitedCols.add(c);

					//the plus size is the size * 2 * 2 + 1
					plusSizes.push(size * 2 * 2 + 1);
					coords.push({ y: r, x: c })
				}
			}

		}
	}

	console.info(`plusSizes: ${plusSizes.join(" - ")}`);
	console.info(`coords: ${coords.map(c => `{${c.y}, ${c.x}}`).join(" - ")}`);

	plusSizes = plusSizes.sort((a, b) => b - a)
		.slice(0, 2);

	return plusSizes.reduce((acc, cur) => acc * cur, 1);
}