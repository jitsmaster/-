class KDTree {
	root: KDNode | null = null;
	numberOfDimensions: number;

	constructor(points: number[][]) {
		//dimension is the number of columns of the first row
		this.numberOfDimensions = points[0].length;
		//first point is the root, since for KD tree, which node being the root doesn't matter
		this.root = new KDNode(points[0]);

		for (const point of points) {
			const n = new KDNode(point);
			this.root.add(n);
		}
	}

	add(point: KDNode): void {
		if (this.root === null) {
			this.root = point;
		} else {
			this.root.add(point);
		}
	}

	addPoint(point: number[]): void {
		const n = new KDNode(point);
		if (this.root === null) {
			this.root = n;
		} else {
			this.root.add(n);
		}
	}

	nearestNeighbor(target: KDPoint): KDNode | null {
		return this.nearestNeighborHelper(this.root, target, 0);
	}

	private nearestNeighborHelper(
		root: KDNode | null,
		target: KDPoint,
		depth: number
	): KDNode | null {
		if (root === null) return null;

		let nextBranch: KDNode | null = null;
		let otherBranch: KDNode | null = null;

		if (target.get(depth) < root.point.get(depth)) {
			nextBranch = root.left;
			otherBranch = root.right;
		} else {
			nextBranch = root.right;
			otherBranch = root.left;
		}

		let temp = this.nearestNeighborHelper(nextBranch, target, depth + 1);
		let best = this.closest(temp, root, target);

		const radiusSquared = KDTree.distSquared(target, best.point);

		const dist = target.get(depth) - root.point.get(depth);

		if (radiusSquared >= dist * dist) {
			temp = this.nearestNeighborHelper(otherBranch, target, depth + 1);
			best = this.closest(temp, best, target);
		}

		return best;
	}

	private closest(n0: KDNode | null, n1: KDNode | null, target: KDPoint): KDNode | null {
		if (n0 === null) return n1;

		if (n1 === null) return n0;

		const d1 = KDTree.distSquared(n0.point, target);
		const d2 = KDTree.distSquared(n1.point, target);

		if (d1 < d2)
			return n0;
		else
			return n1;
	}

	static dist(p0: KDPoint, p1: KDPoint): number {
		return Math.sqrt(this.distSquared(p0, p1));
	}

	static distSquared(p0: KDPoint, p1: KDPoint): number {
		let total = 0;
		const numDims = p0.props.length;

		for (let i = 0; i < numDims; i++) {
			const diff = Math.abs(p0.get(i) - p1.get(i));
			total += Math.pow(diff, 2);
		}
		return total;
	}

	toString(): string {
		if (!this.root)
			return "";

		const sb = [];
		const q: KDNode[] = [];
		q.push(this.root);

		while (q.length > 0) {
			const size = q.length;
			for (let i = 0; i < size; i++) {
				const n = q.shift();
				if (!!n) {
					sb.push(n.point.toString());
					q.push(n.left!);
					q.push(n.right!);
				} else {
					sb.push("null");
				}
			}
			sb.push("\n");
		}
		return sb.join(", ");
	}
}

class KDNode {
	left: KDNode | null = null;
	right: KDNode | null = null;
	numDims: number;
	point: KDPoint;

	constructor(props: number[]) {
		this.point = new KDPoint(props);
		this.numDims = props.length;
	}

	add(n: KDNode, k: number = 0): void {
		//this method will locate the correct place to add the child node
		//not just add child to itself
		if (n.point.get(k) < this.point.get(k)) {
			if (this.left === null) {
				this.left = n;
			} else {
				this.left.add(n, k + 1);
			}
		} else {
			if (this.right === null) {
				this.right = n;
			} else {
				this.right.add(n, k + 1);
			}
		}
	}

	toString(): string {
		return `(point: ${this.point.toString()})`;
	}
}

class KDPoint {
	props: number[];

	constructor(props: number[]) {
		this.props = props;
	}

	get(depth: number): number {
		return this.props[depth % this.props.length];
	}

	size(): number {
		return this.props.length;
	}

	toString(): string {
		return this.props.toString();
	}
}

// const ar = [
// 	[50, 50, 1],
// 	[80, 40, 2],
// 	[10, 60, 3],
// 	[51, 38, 4],
// 	[48, 38, 5],
// ];

// const tree = new KDTree(2);

// for (const coord of ar) {
// 	const n = new KDNode(coord);
// 	tree.add(n);
// }

// console.log("tree=" + tree.toString());
// console.log(tree.nearestNeighbor(new KDPoint([40, 40])));
