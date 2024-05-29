
/**
 * You are given an integer array heights where heights[i] represents the height of the 𝑖𝑡ℎ bar.
 * You may choose any two bars to form a container. Return the maximum amount of water
 * a container can store.
 * @param heights 
 * @returns 
 */
function maxArea(heights: number[]) {
	//Analysis:
	//We need to find the max area between 2 lines in the array
	//The area is determined by the shorter line and the distance between the 2 lines
	//We can use 2 pointers to find the max area
	//We start with the widest area, and move the pointer from the shorter height
	//this way, we are potentially getting the biggest area possible
	//we can stop when the 2 pointers meet

	//Complexity:
	//Time complexity: O(n) - we iterate through the array once
	//Space complexity: O(1) - we only store 2 pointers
	let l = 0;
	let r = heights.length - 1;
	let max = 0;
	while (l < r) {
		const area = Math.min(heights[l], heights[r])
			* (r - l);
		max = Math.max(area, max);
		//take the smaller height and move it inwards
		//so the next height is potentially as big as possible
		//this is different from classic 2 pointers, we only move the pointer from shorter height
		if (heights[l] < heights[r]) {
			l++;
		}
		else {
			r--;
		}
	}

	return max;
}

