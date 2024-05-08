/**
 * We are given an array of n points in the plane, and the problem is to find out the closest pair of points in the array.
 * This problem arises in a number of applications. For example, in air-traffic control, you may want to monitor planes that come too close together,
 * since this may indicate a possible collision. Recall the following formula for distance between two points p and q.
 */


class Coord {
	x!: number;
	y!: number;
}
function closePairOfPoints(points: Coord[]): { p1: Coord, p2: Coord, distance: number } {
	//Complexity:
	//Time: O(n log n), we are sorting the points based on x, and then y
	//Space: O(n log n), we are processing the strip of each divided area, which is n log n
	const l = points.length;

	if (l === 2) {
		return {
			p1: points[0],
			p2: points[1],
			distance: Math.sqrt(distance(points[0], points[1]).distance)
		}
	}

	if (l === 3) {
		//3 points, just brute force
		const ds = [distance(points[0], points[1]), distance(points[1], points[2]), distance(points[0], points[2])];
		const closest = ds.reduce((acc, d) => d.distance < acc.distance ? d : acc, ds[0]);
		closest.distance = Math.sqrt(closest.distance);
		return closest;
	}

	//divide and conquer
	const mid = Math.floor(l / 2);
	const dl = closePairOfPoints(points.slice(0, mid));
	const dr = closePairOfPoints(points.slice(mid));

	//get shorter of 2
	const d = dl.distance < dr.distance ? dl : dr;

	//combining step
	//we want to find all the points within d.distance of the mid point of rectangle area

	//get the mid point
	const midPoint = points[mid];

	//get the points within d.distance of the mid point
	const strip = points.filter(p => Math.abs(p.x - midPoint.x) < d.distance);

	//sort by y
	strip.sort((a, b) => a.y - b.y);

	//compare each point with the next 7 points, which is top left, top right, bottom left, bottom right,
	//top, bottom, mid point
	for (let i = 0; i < strip.length; i++) {
		for (let j = i + 1; j < Math.min(i + 7, strip.length); j++) {
			const d2 = distance(strip[i], strip[j]);
			if (d2.distance < d.distance) {
				d.p1 = strip[i];
				d.p2 = strip[j];
				d.distance = d2.distance;
			}
		}
	}

	return {
		p1: d.p1,
		p2: d.p2,
		distance: Math.sqrt(d.distance) //perform square root to get the actual distance at the very end
	};


	function distance(p1: Coord, p2: Coord): { p1: Coord, p2: Coord, distance: number } {
		//skip expensive square root
		//just use the a^2 + b^2 to compare
		return {
			p1,
			p2,
			distance: Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
		};
	}

}