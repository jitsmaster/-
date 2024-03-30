
/**
 * Berman lives in a rectangular grid. Each cell in the grid either contains a B or nothing at all.

Each B can be planted in any cell of the grid but once planted, it will detonate after exactly 3 seconds.
 Once a B detonates, it's destroyed — along with anything in its four neighboring cells. This means that if a 
 B detonates in cell , any valid cells  and  are cleared. If there is a B in a neighboring cell, the neighboring 
 B is destroyed without detonating, so there's no chain reaction.

Berman is immune to Bs, so he can move freely throughout the grid. Here's what he does:

Initially, Berman arbitrarily plants Bs in some of the cells, the initial state.
After one second, Berman does nothing.
After one more second, Berman plants Bs in all cells without Bs, thus filling the whole grid with Bs. 
No Bs detonate at this point.
After one more second, any Bs planted exactly three seconds ago will detonate. Here, Berman stands back and observes.
Berman then repeats steps 3 and 4 indefinitely.
Note that during every second Berman plants Bs, the Bs are planted simultaneously (i.e., at the exact same moment), 
and any Bs planted at the same time will detonate at the same time.

Given the initial configuration of the grid with the locations of Berman's first batch of planted Bs, 
determine the state of the grid after  seconds.
 * */
function bomberMan(n: number, grid: string[]): string[] {
	//Complexity:
	//Time - O(n * m) - n is the number of seconds, m is the number of cells in the grid
	//Space - O(m) - we need to store the grid's last state

	let lastPlant = [...grid]; //clone the grid as initial state
	let c = 0;
	while (c < n) {
		c++;
		//first round, initial
		if (c === 1) {
			//do nothing
		} else {
			//this will get into the cycle
			const m = c % 2;

			//if the current time is even, we can plant 
			//grid is filled
			if (m === 0) {
				grid = grid.map(row => Array(row.length).fill("O").join(""));
			}
			else {
				//this is the deton time
				//update the grid to take out from the last planted Bs and their neighors
				//and update the lastPlant afterwards
				grid = grid.map((row, i) => {
					const newRow = row.split("").map((cell, j) => {
						// if in last plant, the cell is a B, or neighbor is 4 direction of the B
						const isB = lastPlant[i][j] === "O";
						const rightOfB = j > 0 && lastPlant[i][j - 1] === "O";
						const leftOfB = j < row.length - 1 && lastPlant[i][j + 1] === "O";
						const bottomOfB = i > 0 && lastPlant[i - 1][j] === "O";
						const topOfB = i < grid.length - 1 && lastPlant[i + 1][j] === "O";

						if (isB || rightOfB || leftOfB || bottomOfB || topOfB) {
							return ".";
						}

						return cell;
					}).join("");
					return newRow;
				});

				// update the lastPlant to include the newly planted Bs
				lastPlant = [...grid];
			}
		}
	}

	return grid;
}