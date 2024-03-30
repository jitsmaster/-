function matrixRotationCounterClock(matrix: number[][], r: number): void {
	//this matrix rotation is moving unit by unit
	//we will rotate the matrix layer by layer

	//first, we will determine the number of layers
	const layers = Math.min(matrix.length, matrix[0].length) / 2;

	//for each layer, we will rotate the matrix
	//the algorithm is to move the elements in the matrix
	//to a new position, based on the number of rotations
	//the new position is determined by the formula:
	//new position = (current position + r) % total elements in the layer

	//for each layer
	//number of rotations is based on the out most layer
	//which is top bottom left right size, minus 4 corners
	const totalElements = (matrix.length) * 2 + (matrix[0].length) * 2 - 4;
	r = r % totalElements;

	for (let layer = 0; layer < layers; layer++) {
		//determine the number of elements in the current layer
		const totalElements = (matrix.length - layer - layer) * 2 + (matrix[0].length - layer - layer) * 2 - 4;

		//skip full 360 degree rotations
		const rotations = r % totalElements;

		console.info(`layer: ${layer}, totalElements: ${totalElements}, rotations: ${rotations}`);

		//for each rotation
		for (let rotation = 0; rotation < rotations; rotation++) {
			//store the top left element of the current layer
			const topLeft = matrix[layer][layer];

			//move the elements in the top row of the current layer
			for (let i = layer; i < matrix[0].length - layer - 1; i++) {
				//move the element from right to left
				//whic is the current column is assigned to the next column
				matrix[layer][i] = matrix[layer][i + 1];
			}

			//move the elements in the right column of the current layer
			for (let i = layer; i < matrix.length - layer - 1; i++) {
				//move the element from bottom to top
				//which is the current row is assigned to the next row
				matrix[i][matrix[0].length - layer - 1] = matrix[i + 1][matrix[0].length - layer - 1];
			}

			//move the elements in the bottom row of the current layer
			for (let i = matrix[0].length - layer - 1; i > layer; i--) {
				//move the element from left to right
				//which is the current column is assigned to the previous column
				matrix[matrix.length - layer - 1][i] = matrix[matrix.length - layer - 1][i - 1];
			}

			//move the elements in the left column of the current layer
			for (let i = matrix.length - layer - 1; i > layer; i--) {
				//move the element from top to bottom
				//which is the current row is assigned to the previous row
				matrix[i][layer] = matrix[i - 1][layer];
			}// Write your code here

			//move the top left to a element below it
			matrix[layer + 1][layer] = topLeft;
		}
	}


}