/**
 * You are given an array points where points[i] = [xi, yi] is the coordinates of the ith point on a 2D plane.
 * Multiple points can have the same coordinates.
 *
 * You are also given an array queries where queries[j] = [xj, yj, rj] describes a circle centered at (xj, yj)
 * with a radius of rj.
 *
 * For each query queries[j], compute the number of points inside the jth circle.
 * Points on the border of the circle are considered inside.
 *
 * Return an array answer, where answer[j] is the answer to the jth query.
 */
function countPoints(points: number[][], queries: number[][]): number[] {
	//Complexity:
	//Time O(nlogn + mlogn) where n is the number of points and m is the number of queries
	//Space O(n) where n is the number of points, the points are not copies, but sort in place, but we have to do partial sort
	const kdTree = new KDTreeForPointsInside(points);

	return queries
		.map((q) => kdTree.getPointsInsideRecurse(q, 0, 0, points.length));
}

//need to optimize the partial sort
//this is a kd tree for points inside a circle
//we build the tree by sorting the points by x and y
//then we do a partial sort on the points array
//then we recursively build the tree
//then we recursively check the points inside the circle
//if the point is inside the circle, we count it
//if the point is outside the circle, we ignore it
class KDTreeForPointsInside {
	points: number[][];

	constructor(points: number[][]) {
		this.points = points;
		this.buildTree(0, 0, points.length);
	}

	buildTree(depth: number, start: number, end: number): void {
		if (end - start <= 1) return;

		const k = 1 - depth & 1; // 0 for x, 1 for y
		const mid = Math.floor((end + start) / 2);

		// Use an optimized version of quickselect to sort with partitioning
		//it's much faster than the built-in sort
		this.quickselect(start, end - 1, mid, k);

		// Recursive tree building
		this.buildTree(depth + 1, start, mid);
		this.buildTree(depth + 1, mid + 1, end);
	}

	/**
	 * Performs the quickselect algorithm to find the kth smallest element in the given range.
	 * This method uses the partition function to divide the range into two subranges and recursively
	 * selects the subrange that contains the kth smallest element.
	 *
	 * @param start - The starting index of the range.
	 * @param end - The ending index of the range.
	 * @param k - The index of the element to find (kth smallest element).
	 * @param axis - The axis used for partitioning the range.
	 */
	quickselect(start: number, end: number, k: number, axis: number): void {
		while (start < end) {
			const pivotIndex = this.partition(start, end, axis);

			//quick select part.
			//if the pivot index is less than k, we need to search the right side
			//if the pivot index is greater than k, we need to search the left side
			if (pivotIndex > k) {
				end = pivotIndex - 1;
			} else if (pivotIndex < k) {
				start = pivotIndex + 1;
			} else {
				//if the pivot index is equal to k, we found the kth smallest element
				//all elements to the left of the pivot index are less than the pivot
				//all elements to the right of the pivot index are greater than the pivot
				break;
			}
		}
	}

	/**
	 * Partitions the array of points based on a given axis and a pivot point.
	 * Points with values less than the pivot point on the given axis are moved to the left of the pivot,
	 * while points with values greater than or equal to the pivot point on the given axis are moved to the right.
	 * 
	 * @param start - The starting index of the partition range.
	 * @param end - The ending index of the partition range.
	 * @param axis - The axis to partition the points on.
	 * @returns The index of the pivot point after partitioning.
	 */
	partition(start: number, end: number, axis: number): number {
		const pivot = this.points[end];
		let i = start;
		for (let j = start; j < end; j++) {
			if (this.points[j][axis] < pivot[axis]) {
				[this.points[i], this.points[j]] = [this.points[j], this.points[i]];
				i++;
			}
		}
		[this.points[i], this.points[end]] = [this.points[end], this.points[i]];
		return i;
	}

	getSquareDistance(p1: number[], p2: number[]): number {
		return (p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2;
	}


	isPointInside(p: number[], c: number[]): boolean {
		//figuring out if the point is inside the circle
		//by checking the distance between the point and the center
		//is less then the radius
		//no need to square root, as we are comparing the square of the distance
		return this.getSquareDistance(p, c) <= c[2] ** 2;
	}

	getPointsInsideRecurse(circle: number[], depth: number, start: number, end: number): number {
		if (end === start)
			return 0;
		else if (end - start === 1)
			return this.isPointInside(this.points[start], circle) ? 1 : 0;

		const k = 1 - depth & 1;
		const mid = Math.floor((end + start) / 2);
		const diff = this.points[mid][k] - circle[k];

		if (diff > circle[2])
			return this.getPointsInsideRecurse(circle, depth + 1, start, mid);
		else if (diff < -circle[2])
			return this.getPointsInsideRecurse(circle, depth + 1, mid + 1, end);
		else
			return this.getPointsInsideRecurse(circle, depth + 1, start, mid)
				+ (this.isPointInside(this.points[mid], circle) ? 1 : 0)
				+ this.getPointsInsideRecurse(circle, depth + 1, mid + 1, end);
	}
}