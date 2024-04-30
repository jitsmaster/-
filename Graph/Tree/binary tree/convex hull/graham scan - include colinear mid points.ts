
// function outerTrees(trees: number[][]): number[][] {
/**
 * Computes the convex hull of a set of 2D points using the Graham scan algorithm,
 * including colinear mid points.
 *
 * @param points - An array of 2D points represented as [x, y] arrays.
 * @returns The convex hull of the input points as an array of 2D points.
 */
function convexHullGrahamScanIncludeColinearMidPoints(points: number[][]): number[][] {
	//Complexity: 
	//Time: O(nlogn) - sorting and iterating through the points
	//Space: O(n) - storing the points in the stack twice

	if (points.length < 3) {
		return points
	}

	const sortedPoints = points.concat().sort(sortByAngle)

	//because we are including colinear mid points, we need to keep track of the lower and upper hulls separately
	//and then merge them at the end
	//otherwise if lower hulls only, will not be able to include the mid point of the colinear line
	//from the bl -> tr direction
	const lostack: number[][] = []
	const histack: number[][] = []

	for (const tree of sortedPoints) {
		while (
			lostack.length >= 2 &&
			ccw(lostack[lostack.length - 2], lostack[lostack.length - 1], tree) > 0
		) {
			lostack.pop()
		}

		while (
			histack.length >= 2 &&
			ccw(histack[histack.length - 2], histack[histack.length - 1], tree) < 0
		) {
			histack.pop()
		}

		lostack.push(tree)
		histack.push(tree)
	}

	return [...new Set([...lostack, ...histack])]
};

/**
 * The ccw function calculates the orientation of three points in a 2D plane. 
 * It determines whether the points are arranged in a counterclockwise (ccw) or clockwise (cw) order, 
 * or if they are collinear.
 * @param p1 
 * @param p2 
 * @param p3 
 * @returns 
 */
function ccw(p1: number[], p2: number[], p3: number[]): number {
	const [x1, y1] = p1
	const [x2, y2] = p2
	const [x3, y3] = p3
	return ((y3 - y2) * (x2 - x1)) - ((y2 - y1) * (x3 - x2))
}

/**
 * The sortByAngle function is used to compare two points (p1 and p2) based on their x-coordinates and y-coordinates. 
 * It returns a negative value if p1 should come before p2 in the sorted order, a positive value if p1 should come after p2, 
 * and zero if p1 and p2 have the same coordinates.
 * It will compare x values first, and if they are equal, it will compare y values.
 * @param p1 
 * @param p2 
 * @returns 
 */
function sortByAngle(p1: number[], p2: number[]): number {
	const [x1, y1] = p1
	const [x2, y2] = p2
	return x1 !== x2 ? x1 - x2 : y1 - y2
}