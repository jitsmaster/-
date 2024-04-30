/**
 * Represents a point in 2D space.
 */
class Point {
	constructor(public x: number, public y: number) { }
}



function convexHullGrahamScanMinPoints(points: Point[]): Point[] {

	//Complexity: 
	//Time: O(nlogn) - get min y point, sorting and iterating through the points
	//Space: O(n) - storing the points in the stack twice

	/**
	 * Computes the cross product of two vectors (b - a) and (c - a).
	 * 
	 * @param a - The first point.
	 * @param b - The second point.
	 * @param c - The third point.
	 * @returns The cross product of the two vectors.
	 */
	function ccw(a: Point, b: Point, c: Point): number {
		return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
	}

	/**
	 * Finds the point with the smallest y-coordinate in a list of points.
	 * 
	 * @param points - The list of points.
	 * @returns The point with the smallest y-coordinate.
	 */
	function getMinY(points: Point[]): Point {
		let minYPoint = points[0];
		for (let i = 1, size = points.length; i < size; i++) {
			if (points[i].y < minYPoint.y) {
				minYPoint = points[i];
			}
		}
		return minYPoint;
	}

	/**
	 * The comparator just compares the cross product of two vectors to see which one is on the
	 * left side and which is on the right side. Actual angles don't need to be calculated.
	 * 
	 * @param points - The list of points to be sorted.
	 * @param ref - The reference point for sorting.
	 */
	function sortByAngle(points: Point[], ref: Point): void {
		points.sort((b, c) => {
			/*
			 * The ref point should always be pushed to the beginning.
			 */
			if (b === ref) return -1;
			if (c === ref) return 1;

			const angle = ccw(ref, b, c);

			if (angle === 0) {
				/*
				 * Handle collinear points. We can just use the x coordinate and not 
				 * bother with the y since the ratio of y/x is going to be the same.
				 */
				if (b.x === c.x) {
					/*
					 * Rare case of floats matching up in a vertical line, we want 
					 * the closer point to be first.
					 */
					return b.y < c.y ? -1 : 1;
				} else {
					return b.x < c.x ? -1 : 1;
				}
			} else {
				return angle * -1;
			}
		});
	}

	if (points.length < 3) {
		/*
		 * Special case, the hull is the triangle itself.
		 */
		return points;
	}

	const stack: Point[] = [];

	/*
	 * The bottom most, left most point is guaranteed to be on the hull.
	 */
	const minYPoint = getMinY(points);
	sortByAngle(points, minYPoint); // Sort by angle with respect to minYPoint

	stack.push(points[0]); // 1st point is guaranteed to be on the hull
	stack.push(points[1]); // Don't know about this one yet

	for (let i = 2; i < points.length; i++) {
		const next = points[i];
		let p = stack.pop();

		while (stack.length > 0 && ccw(stack[stack.length - 1], p!, next) <= 0) {
			p = stack.pop(); // Delete points that create clockwise turn
		}

		stack.push(p!);
		stack.push(points[i]);

	}

	/*
	 * The very last point pushed in could have been collinear, so we check for that.
	 */
	const p = stack.pop();
	if (ccw(stack[stack.length - 1], p!, minYPoint) > 0) {
		stack.push(p!); // Put it back, everything is fine
	}

	return stack;
}
}



// Example usage
const points: Point[] = [
	new Point(2, 2),
	new Point(-2, 3),
	new Point(1, 1)
];

const hull = new ConvexHullGrahamScan();
console.log("Graham Scan:", hull.scan(points));
