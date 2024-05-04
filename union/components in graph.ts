class DisjointedSet {
	ar: number[] = [];
	constructor() {

	}

	find(idx: number) {
		//fillin  the missing number
		if (this.ar.length < idx + 1)
			this.ar.push(...Array(idx - this.ar.length + 1).fill(-1));

		let p = idx;
		while (this.ar[p] > 0) {
			p = this.ar[p]
		}

		//path compression
		while (p != idx) {
			[this.ar[idx], idx] = [p, this.ar[idx]]
		}

		return p
	}

	union(idx1: number, idx2: number) {
		let p1 = this.find(idx1);
		let p2 = this.find(idx2);

		if (p1 === p2)
			return;

		if (this.ar[p1] < this.ar[p2]) {
			this.ar[p1] += this.ar[p2];
			this.ar[p2] = p1;
		}
		else {
			this.ar[p2] += this.ar[p1];
			this.ar[p1] = p2;
		}
	}
}

/*
 * Complete the 'componentsInGraph' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts 2D_INTEGER_ARRAY gb as parameter.
 */

export function componentsInGraph(gb: number[][]): number[] {

	const ds = new DisjointedSet();
	for (let c of gb) {
		ds.union(c[0], c[1]);
	}

	const uniqueGroupSizes = new Set(ds.ar.filter(c => c < -1)
		.map(c => -c));

	return [Math.min(...uniqueGroupSizes), Math.max(...uniqueGroupSizes)]
}
