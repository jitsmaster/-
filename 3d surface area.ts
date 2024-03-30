function surfaceArea(A: number[][]): number {
	//Complexity:
	//Time complexity: O(H*W) - we need to iterate through the whole board
	//Space complexity: O(1) - constant space

	//Analysis:
	//We deal with the surface side by side, top and bottom surface is straightforward, just the size of the board;
	//for 4 side, we need to remove the overlapping area from 2 cubes
	const H = A.length;
	const W = A[0].length;

	//top and bottom surface is straightforward, just the size of the board;
	let area = 2 * H * W;

	//for 4 side, we need to remove the overlapping area from 2 cubes
	for (let row = 0; row < H; row++) {
		for (let col = 0; col < W; col++) {
			//for cube at i,j, we need to remove the overlapping area from 2 cubes
			//the overlapping area is the smaller of the 2 cubes

			//front surface:
			//first row, no overlapping, use the cube height;
			//not first row, overlapping, use this cube's height - previous cube's height, 
			//if the previous cube is taller, then this cube is all hidden from front, so the area is 0
			area += row - 1 >= 0 ?
				Math.max(0, A[row][col] - A[row - 1][col]) :
				A[row][col];

			//back surface:
			//last row, no overlapping, use the cube height;
			//not last row, overlapping, use this cube's height - next cube's height,
			//if the next cube is taller, then this cube is all hidden from back, so the area is 0
			area += row + 1 < H ?
				Math.max(0, A[row][col] - A[row + 1][col]) :
				A[row][col];

			//left surface:
			//first column, no overlapping, use the cube height;
			//not first column, overlapping, use this cube's height - previous cube's height,
			//if the previous cube is taller, then this cube is all hidden from left, so the area is 0
			area += col - 1 >= 0 ?
				Math.max(0, A[row][col] - A[row][col - 1]) :
				A[row][col];

			//right surface:
			//last column, no overlapping, use the cube height;
			//not last column, overlapping, use this cube's height - next cube's height,
			//if the next cube is taller, then this cube is all hidden from right, so the area is 0
			area += col + 1 < W ?
				Math.max(0, A[row][col] - A[row][col + 1]) :
				A[row][col];
		}
	}

	return area;
}
