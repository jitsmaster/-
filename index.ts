import { Point, convexHull, sortByPolarAngle } from "./Graph/Tree/binary tree/convex hull/graham scan - ignore colinear mid points";

// Example usage:
const points: Point[] = [
	new Point(0, 3),
	new Point(2, 2),
	new Point(1, 1),
	new Point(2, 1),
	new Point(3, 0),
	new Point(0, 0),
	new Point(3, 3)
];

const convexHullPoints = convexHull(points);
console.log(convexHullPoints);


const sortedPoints = sortByPolarAngle(convexHullPoints);
console.log(sortedPoints);