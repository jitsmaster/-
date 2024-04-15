/**
 * There are  points on a plane. Each point  is described by , where . There are three types of queries needed: 

X i j Reflect all points in the inclusive range between points  and  along the -axis.
Y i j Reflect all points in the inclusive range between points  and  along the -axis.
C i j Count the number of points in the inclusive range between points  and  in each of the  quadrants. Then print a single line of four space-separated integers describing the respective numbers of points in the first, second, third, and fourth quadrants in that order.
As a reminder, the four quadrants of a graph are labeled as follows:


Given a set of  points and  queries, perform each query in order. For example, given points  and . Initially the points are in quadrants  and . The first query says to reflect points with indices from  to  along the -axis. After the query,  and quadrants are  and . The next query prints the number of points in each quadrant: 0 1 0 1. The third query says to reflect the point with index  to  along the -axis, so now . The points now lie in quadrants  and , so the fourth query output is 0 1 1 0.

Note: Points may sometimes share the same coordinates.
 */

function quadrants(p: number[][], queries: string[]): void {
	const n = p.length;
	//since we have 4 quadrants, the segtree size will be 4 * n
	const tree = new Array(4 * n).fill(0);

	function buildTree(node: number, start: number, end: number): void {
		if (start === end) {
			tree[node] = getQuadrant(p[start]);
			return;
		}

		const mid = Math.floor((start + end) / 2);
		buildTree(2 * node + 1, start, mid);
		buildTree(2 * node + 2, mid + 1, end);
		tree[node] = mergeQuadrants(tree[2 * node + 1], tree[2 * node + 2]);
	}

	function updateTree(node: number, start: number, end: number, idx: number): void {
		if (start === end) {
			tree[node] = getQuadrant(p[start]);
			return;
		}

		//divide and conquer
		//only recurse on the side where the index is located at
		const mid = Math.floor((start + end) / 2);
		if (idx <= mid) {
			updateTree(2 * node + 1, start, mid, idx);
		} else {
			updateTree(2 * node + 2, mid + 1, end, idx);
		}
		tree[node] = mergeQuadrants(tree[2 * node + 1], tree[2 * node + 2]);
	}

	function queryTree(node: number, start: number, end: number, left: number, right: number): number[] {
		if (start > right || end < left) {
			return [0, 0, 0, 0];
		}

		if (start >= left && end <= right) {
			return tree[node];
		}

		const mid = Math.floor((start + end) / 2);
		const leftQuadrant = queryTree(2 * node + 1, start, mid, left, right);
		const rightQuadrant = queryTree(2 * node + 2, mid + 1, end, left, right);
		return mergeQuadrants(leftQuadrant, rightQuadrant);
	}

	function getQuadrant(point: number[]): number[] {
		const [x, y] = point;
		if (x > 0 && y > 0) {
			return [1, 0, 0, 0];
		} else if (x < 0 && y > 0) {
			return [0, 1, 0, 0];
		} else if (x < 0 && y < 0) {
			return [0, 0, 1, 0];
		} else {
			return [0, 0, 0, 1];
		}
	}

	function mergeQuadrants(quadrant1: number[], quadrant2: number[]): number[] {
		//return the sum of each quadrant
		//which is the number of points in each quadrant together
		return [
			quadrant1[0] + quadrant2[0],
			quadrant1[1] + quadrant2[1],
			quadrant1[2] + quadrant2[2],
			quadrant1[3] + quadrant2[3],
		];
	}

	buildTree(0, 0, n - 1);

	for (const query of queries) {
		const [type, i, j] = query.split(" ");
		const idx = parseInt(i) - 1;
		const rangeStart = Math.min(idx, parseInt(j) - 1);
		const rangeEnd = Math.max(idx, parseInt(j) - 1);

		if (type === "X" || type === "Y") {
			updateTree(0, 0, n - 1, idx);
		} else if (type === "C") {
			const [first, second, third, fourth] = queryTree(0, 0, n - 1, rangeStart, rangeEnd);
			console.log(`${first} ${second} ${third} ${fourth}`);
		}
	}
}