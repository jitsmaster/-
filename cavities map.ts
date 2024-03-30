function cavityMap(grid: string[]): string[] {
	const dp = grid.map((row) => row.split("").map((_) => 0));

	for (let i = 1; i < grid.length - 1; i++) {
		for (let j = 1; j < grid[i].length - 1; j++) {
			//if any of it's neighbors are already a cavity, then it's not a cavity
			if (
				dp[i - 1][j] === 1 ||
				dp[i + 1][j] === 1 ||
				dp[i][j - 1] === 1 ||
				dp[i][j + 1] === 1
			) {
				continue;
			}
			//bypass the first one will save us a lot of time
			if (
				grid[i][j] > grid[i - 1][j] &&
				grid[i][j] > grid[i + 1][j] &&
				grid[i][j] > grid[i][j - 1] &&
				grid[i][j] > grid[i][j + 1]
			) {
				dp[i][j] = 1;
			}
		}
	}

	return dp.map((row, i) => {
		return row
			.map((_, j) => {
				if (dp[i][j] === 1) {
					return "X";
				}
				return grid[i][j];
			})
			.join("");
	});

}