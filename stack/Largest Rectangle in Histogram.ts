/**
 * Given an array of integers heights representing the histogram's bar height
 * where the width of each bar is 1, return the area of the largest rectangle
 * in the histogram.
 * @param heights 
 * @returns 
 */
function largestRectangleArea(heights: number[]): number {
	//use a stack to track the increasing height items
	//pop them when encounter height smaller than them
	//then loop the stack get the pushed items height combos
	let max = 0;
	const stack: { index: number, height: number }[] = [];
	const l = heights.length;
	//first loop the heights
	heights.forEach((h, i) => {
		let startIndex = i;
		while (!!stack.length && stack[stack.length - 1].height > h) {
			//pop any items higher before current height
			const { index: poppedIndex, height: poppedHeight } = stack.pop()!;
			//for popped items, calculate the area, the formula is the height of popped item, times the distance between the current index and the popped index
			//explanation: if current item is 2, and previous is 6, then the distance is 1, so the area is 6 * 1 = 6
			//when keep on popping, the distance is 2, the height to pop is 5, then the area is 5 * 2 = 10
			//keep doing, the distance is 3, the height to pop is 4, then the area is 4 * 3 = 12
			const area = poppedHeight * (i - poppedIndex);
			max = Math.max(area, max);
			//reset start index to the last popped index
			startIndex = poppedIndex;
		}

		//push the item in
		stack.push({
			index: startIndex,
			height: h
		})
	});

	//now go through the stack
	stack.forEach(({ index, height }) => {
		//calculate the area in the stack, 
		//the formula is the height of the item in the stack, times the distance between the last index and the current index
		//explanation: what remains are all shortest height,and in ascending order,
		//so each item's height times it's distance to the last item is the area
		max = Math.max(max, height * (l - index));
	})

	return max;

};