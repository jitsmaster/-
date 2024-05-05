/**
 * A city's skyline is the outer contour of the silhouette formed by all the buildings in that city
 * when viewed from a distance. Given the locations and heights of all the buildings, return the
 * skyline formed by these buildings collectively.
 *
 * The geometric information of each building is given in the array buildings where buildings[i] =
 * [lefti, righti, heighti]:
 * - lefti is the x coordinate of the left edge of the ith building.
 * - righti is the x coordinate of the right edge of the ith building.
 * - heighti is the height of the ith building.
 *
 * You may assume all buildings are perfect rectangles grounded on an absolutely flat surface at
 * height 0.
 *
 * The skyline should be represented as a list of "key points" sorted by their x-coordinate in the
 * form [[x1,y1],[x2,y2],...]. Each key point is the left endpoint of some horizontal segment in
 * the skyline except the last point in the list, which always has a y-coordinate 0 and is used to
 * mark the skyline's termination where the rightmost building ends. Any ground between the
 * leftmost and rightmost buildings should be part of the skyline's contour.
 *
 * Note: There must be no consecutive horizontal lines of equal height in the output skyline. For
 * instance, [...,[2 3],[4 5],[7 5],[11 5],[12 7],...] is not acceptable; the three lines of height
 * 5 should be merged into one in the final output as such: [...,[2 3],[4 5],[12 7],...]
 */

class Node {
	start: number;
	end: number;
	maxHeight: number;
	left: Node | null;
	right: Node | null;

	constructor(i: number, j: number) {
		this.start = i;
		this.end = j;
		this.maxHeight = 0;
		this.left = null;
		this.right = null;
	}
}

/**
 * This is a segment tree that stores not just number
 * But objects with start, end, and maximum value
 */
class SegmentTree {
	root: Node | null;

	constructor(nums: number[]) {
		const n = nums.length;
		this.root = this.buildTree(nums, 0, n - 1);
	}

	private buildTree(nums: number[], i: number, j: number): Node | null {
		if (i >= j) {
			return null;
		}
		if (i + 1 === j) {
			return new Node(nums[i], nums[j] - 1);
		}
		const node = new Node(nums[i], nums[j] - 1);
		const mid = i + Math.floor((j - i) / 2);

		//recursively build the left and right nodes
		node.left = this.buildTree(nums, i, mid);
		node.right = this.buildTree(nums, mid, j);
		return node;
	}

	public updateHeight(root: Node | null, i: number, j: number, height: number): void {
		if (i > j) {
			return;
		}
		if (root && root.start === i && root.end === j && root.left === null) {
			root.maxHeight = Math.max(root.maxHeight, height);
			return;
		} class Node {
			start: number;
			end: number;
			maxHeight: number;
			left: Node | null;
			right: Node | null;

			constructor(i: number, j: number) {
				this.start = i;
				this.end = j;
				this.maxHeight = 0;
				this.left = null;
				this.right = null;
			}
		}

		/**
		 * This is a segment tree that stores not just number
		 * But objects with start, end, and maximum value
		 */
		class SegmentTree {
			root: Node | null;

			constructor(nums: number[]) {
				const n = nums.length;
				this.root = this.buildTree(nums, 0, n - 1);
			}

			private buildTree(nums: number[], i: number, j: number): Node | null {
				if (i >= j) {
					return null;
				}
				if (i + 1 === j) {
					return new Node(nums[i], nums[j] - 1);
				}
				const node = new Node(nums[i], nums[j] - 1);
				const mid = i + Math.floor((j - i) / 2);
				node.left = this.buildTree(nums, i, mid);
				node.right = this.buildTree(nums, mid, j);
				return node;
			}

			public update(root: Node | null, i: number, j: number, height: number): void {
				if (i > j) {
					return;
				}
				if (root && root.start === i && root.end === j && root.left === null) {
					root.maxHeight = Math.max(root.maxHeight, height);
					return;
				}
				if (root) {
					const mid = root.left!.end;
					if (mid < i) {
						this.update(root.right, i, j, height);
					} else if (j <= mid) {
						this.update(root.left, i, j, height);
					} else {
						this.update(root.left, i, mid, height);
						this.update(root.right, mid + 1, j, height);
					}
					if (root.left && root.right) {
						root.maxHeight = Math.max(root.left.maxHeight, root.right.maxHeight);
					}
				}
			}


			/**
			 * Standard seg tree query, O(log n)
			 * @param root 
			 * @param i 
			 * @param j 
			 * @returns 
			 */
			query(root: Node | null, i: number, j: number): number {
				if (i > j) {
					return 0;
				}
				if (root) {
					if (i <= root.start && root.end <= j) {
						//if the range is within the query range, return the max height
						return root.maxHeight;
					}
					const mid = root.left!.end;
					if (j <= mid) {
						return this.query(root.left, i, j);
					}
					if (i > mid) {
						return this.query(root.right, i, j);
					}
					return Math.min(this.query(root.left, i, mid), this.query(root.right, mid + 1, j));
				}

				return 0;
			}
		}


		function getSkyline(buildings: number[][]): number[][] {
			const set = new Set<number>();
			for (const building of buildings) {
				set.add(building[0]);
				set.add(building[1]);
			}
			const x = Array.from(set);
			x.sort((a, b) => a - b);
			const st = new SegmentTree(x);
			for (const building of buildings) {
				st.update(st.root, building[0], building[1] - 1, building[2]);
			}
			let prev = 0;
			const res: number[][] = [];
			for (let i = 0; i < x.length - 1; i++) {
				const h = st.query(st.root, x[i], x[i + 1] - 1);
				if (h !== prev) {
					res.push([x[i], h]);
					prev = h;
				}
			}
			res.push([x[x.length - 1], 0]);
			return res;
		}
		if (root) {
			const mid = root.left!.end;
			if (mid < i) {
				this.updateHeight(root.right, i, j, height);
			} else if (j <= mid) {
				this.updateHeight(root.left, i, j, height);
			} else {
				this.updateHeight(root.left, i, mid, height);
				this.updateHeight(root.right, mid + 1, j, height);
			}
			if (root.left && root.right) {
				root.maxHeight = Math.max(root.left.maxHeight, root.right.maxHeight);
			}
		}
	}


	/**
	 * Standard seg tree query, O(log n)
	 * @param root 
	 * @param i 
	 * @param j 
	 * @returns 
	 */
	query(root: Node | null, i: number, j: number): number {
		if (i > j) {
			return 0;
		}
		if (root) {
			if (i <= root.start && root.end <= j) {
				//if the range is within the query range, return the max height
				return root.maxHeight;
			}
			const mid = root.left!.end;
			if (j <= mid) {
				return this.query(root.left, i, j);
			}
			if (i > mid) {
				return this.query(root.right, i, j);
			}
			return Math.min(this.query(root.left, i, mid), this.query(root.right, mid + 1, j));
		}

		return 0;
	}
}


function getSkyline(buildings: number[][]): number[][] {
	const set = new Set<number>();
	for (const building of buildings) {
		set.add(building[0]);
		set.add(building[1]);
	}
	const xArray = Array.from(set);
	xArray.sort((a, b) => a - b);

	const st = new SegmentTree(xArray);
	for (const building of buildings) {
		st.updateHeight(st.root, building[0], building[1] - 1, building[2]);
	}

	let prev = 0;
	const res: number[][] = [];
	for (let i = 0; i < xArray.length - 1; i++) {
		const h = st.query(st.root, xArray[i], xArray[i + 1] - 1);
		if (h !== prev) {
			res.push([xArray[i], h]);
			prev = h;
		}
	}
	res.push([xArray[xArray.length - 1], 0]);
	return res;
}