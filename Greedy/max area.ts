function maxArea(height: number[]): number {
	//this is combination of 2 pointers and greedy algorithm
	let maxArea = 0;
	let left = 0;
	let right = height.length - 1;

	while (left < right) {
		//the algorithm is to find the max area between 2 lines
		//which is min of 2 heights times the distance between the 2 lines
		maxArea = Math.max(maxArea, Math.min(height[left], height[right]) * (right - left));

		//move the pointer that points on the smaller height bar
		if (height[left] < height[right]) {
			left++;
		} else {
			right--;
		}
	}

	return maxArea;
}

