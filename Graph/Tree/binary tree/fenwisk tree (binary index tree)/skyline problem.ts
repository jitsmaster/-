import { FenwickTree } from "./fenwick tree";

/**
 * A city's skyline is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance.
 * Given the locations and heights of all the buildings, return the skyline formed by these buildings collectively.
 *
 * The geometric information of each building is given in the array buildings where buildings[i] = [lefti, righti, heighti]:
 * - lefti is the x coordinate of the left edge of the ith building.
 * - righti is the x coordinate of the right edge of the ith building.
 * - heighti is the height of the ith building.
 *
 * You may assume all buildings are perfect rectangles grounded on an absolutely flat surface at height 0.
 *
 * The skyline should be represented as a list of "key points" sorted by their x-coordinate in the form [[x1,y1],[x2,y2],...].
 * Each key point is the left endpoint of some horizontal segment in the skyline except the last point in the list,
 * which always has a y-coordinate 0 and is used to mark the skyline's termination where the rightmost building ends.
 * Any ground between the leftmost and rightmost buildings should be part of the skyline's contour.
 *
 * Note: There must be no consecutive horizontal lines of equal height in the output skyline.
 * For instance, [...,[2 3],[4 5],[7 5],[11 5],[12 7],...] is not acceptable;
 * the three lines of height 5 should be merged into one in the final output as such: [...,[2 3],[4 5],[12 7],...]
 *
 * @param buildings The array of buildings with their locations and heights.
 * @returns The skyline formed by the buildings.
 */
function getSkyline(buildings: number[][]): number[][] {
	const events = buildings.flatMap(([l, r, h]) => [
		[l, h, 1],
		[r, h, -1],
	]);
	events.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
	const fenTree = new FenwickTree<number>([], {
		defaultValue: () => 0,
		merge: (a, b) => Math.max(a, b),
		exclude: (c, b) => Math.max(0, c - b),
	});
	const result: number[][] = [];
	for (const [x, h, t] of events) {
		if (t === 1) {
			const prev = fenTree.queryRange(0, x);
			if (h > prev) {
				result.push([x, h]);
			}
		}
		fenTree.update(x, h);
	}
	return result;
};