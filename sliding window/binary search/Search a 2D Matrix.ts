
/**
 * You are given an m x n integer matrix matrix with the following two properties:
 * 
 * Each row is sorted in non-decreasing order.
 * The first integer of each row is greater than the last integer of the previous row.
 * 
 * Given an integer target, return true if target is in matrix or false otherwise.
 * 
 * You must write a solution in O(log(m * n)) time complexity.
 * 
 * @param matrix 
 * @param target 
 * @returns 
 */
function searchMatrix(matrix: number[][], target: number): boolean {
	//Analysis: 
	//since the matrix is basically a sorted array
	//flatten it using binary search

	//Complexity:
	//Time: O(log(m * n)) - binary search on total size of the matrix
	//Space: O(1) - constant space with a few variables

	//edge case: empty matrix
	if (matrix.length === 0 || matrix[0].length === 0)
		return false;

	//get total length of the matrix
	const len = matrix.length * matrix[0].length;

	let l = 0;
	let r = len - 1;
	while (l <= r) {
		//bitwise right shift to divide by 2 and floor
		const mid = (l + r) >> 1;
		//convert the position back to row and col
		const row = Math.floor(mid / matrix[0].length);
		const col = mid % matrix[0].length;
		if (matrix[row][col] === target) {
			return true;
		}

		if (target < matrix[row][col]) {
			//move left
			r = mid - 1;
		}
		else
			l = mid + 1;
	}

	return false;
};