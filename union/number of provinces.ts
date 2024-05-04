/**
 * There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, 
 * and city b is connected directly with city c, then city a is connected indirectly with city c.
 * A province is a group of directly or indirectly connected cities and no other cities outside of the group.
 * You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are 
 * directly connected, and isConnected[i][j] = 0 otherwise.
 * 
 * Return the total number of provinces.
 */

class DisjointedSet {
	unionArray: number[] = [];

	constructor(size: number) {
		this.unionArray = Array(size).fill(-1);
	}

	find(idx: number) {
		let parent = idx;
		while (this.unionArray[parent] > 0) {
			parent = this.unionArray[parent];
		}

		//path compression
		while (parent != idx) {
			[this.unionArray[idx], idx] = [parent, this.unionArray[idx]]
		}

		return parent;
	}

	union(idx1: number, idx2: number) {
		const p1 = this.find(idx1);
		const p2 = this.find(idx2);

		if (p1 === p2)
			return;

		//merge small set to big set
		if (this.unionArray[p1] < this.unionArray[p2]) {
			this.unionArray[p1] += this.unionArray[p2];
			this.unionArray[p2] = p1;
		}
		else {
			this.unionArray[p2] += this.unionArray[p1];
			this.unionArray[p1] = p2;
		}
	}
}
export function findCircleNum(isConnected: number[][]): number {
	//build a disjointed set
	const ds = new DisjointedSet(isConnected.length);

	//use the actual connection map to union
	for (let i = 0; i < isConnected.length; i++) {
		const con = isConnected[i];
		//grab all 1s
		con.forEach((val, idx) => {
			if (idx === i) {
				return;
			}

			if (val === 1) {
				ds.union(i, idx);
			}
		})
	}

	console.info(ds.unionArray)

	//find all parents that are below or equals to -1, since a province with a single city is also a province
	return ds.unionArray.filter(v => v <= -1).length;
};