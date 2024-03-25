
function imageMatching(grid1: string[], grid2: string[]): number {
	function dfs(g1: number[][], g2: number[][], i: number, j: number): boolean {
		//use depth-first search to find the boundaries of the region
		//start from the cell (i, j) and explore the neighboring cells
		//in all 4 directions; up, down, left, and right
		//since the intitial values are true, the single cell region can be counted
		//dfs is recursive, so to make sure all neighboring cells also have their neighoring cells checked
		//the memo grid is used to mark the cells that have been visited
		//so we don't go back to check on them again
		const rowCount = memo.length;
		const colCount = memo[0].length;

		//reset the map, means next time we don't have to go back to this cell anymore
		memo[i][j] = 0;

		let up = true, down = true, left = true, right = true;

		//each direction is only recursed, if the memo grid cell is 1
		//this is filter out both cell being 0 and visited cells
		if (i > 0 && memo[i - 1][j] === 1)
			up = dfs(g1, g2, i - 1, j);
		if (i < rowCount - 1 && memo[i + 1][j] === 1)
			down = dfs(g1, g2, i + 1, j);
		if (j > 0 && memo[i][j - 1] === 1)
			left = dfs(g1, g2, i, j - 1);
		if (j < colCount - 1 && memo[i][j + 1] === 1)
			right = dfs(g1, g2, i, j + 1);


		return g1[i][j] === 1
			&& g2[i][j] === 1
			&& up
			&& down
			&& left
			&& right;
	}

	let count = 0;
	const numGrid1: number[][] = new Array(grid1.length).fill(0).map(() => new Array(grid1[0].length).fill(0));
	const numGrid2: number[][] = new Array(grid1.length).fill(0).map(() => new Array(grid1[0].length).fill(0));

	// create g1 and g2
	for (let i = 0; i < grid1.length; i++) {
		const str1 = grid1[i].split('');
		const str2 = grid2[i].split('');
		for (let j = 0; j < grid1[0].length; j++) {
			numGrid1[i][j] = parseInt(str1[j]);
			numGrid2[i][j] = parseInt(str2[j]);
		}
	}

	//create a memoization grid
	//this grid will initially store the bitwise OR of the two grids
	//that means either grid cell has 1, the memo grid cell will have 1
	//later on it will be use to mark the cells that have been visited
	//to make sure it's no longer calculated again in the depth first search
	const memo: number[][] = new Array(grid1.length).fill(0).map(() => new Array(grid1[0].length).fill(0));
	for (let i = 0; i < grid1.length; i++) {
		for (let j = 0; j < grid1[0].length; j++) {
			memo[i][j] = numGrid1[i][j] | numGrid2[i][j];
		}
	}

	for (let i = 0; i < grid1.length; i++) {
		for (let j = 0; j < grid1[0].length; j++) {
			if (memo[i][j] === 1 && dfs(numGrid1, numGrid2, i, j))
				count++;
		}
	}
	return count;
}

