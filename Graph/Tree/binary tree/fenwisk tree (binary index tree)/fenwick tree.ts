/**
 * ReversableOperator interface
 * This interface is used to define the operations that can be applied to the Fenwick Tree
 * The operations needed be reversible (undo), so that the original value can be restored
 */
export interface ReversableOperator<T> {
	firstItem(): T;
	merge(a: T, b: T): T;
	exclude(c: T, b: T): T;
}

/**
 * Fenwick Tree (Binary Indexed Tree) implementation
 * The purpose of Fenwick Tree is to efficiently update and query prefix sums of an array
 * Query can be either from first item, or range in the middle
 * Note: The index is 1-based
 * 
 */
export class FenwickTree<T> {
	//Space: O(n) - the cloned array storage is just n + 1


	private tree: T[];
	private reversableAggregator: ReversableOperator<T>;

	constructor(ar: T[], reversableAggregator: ReversableOperator<T>) {
		//Complexity:
		//Time: O(n log n) - building the tree is actual linear
		this.reversableAggregator = reversableAggregator;

		//make a copy of the array
		this.tree = [reversableAggregator.firstItem(), ...ar]; // 1-based index, the first item is not used
		const size = this.tree.length;

		for (let i = 1; i < size; i++) {
			const p = this.getParentIndex(i); // index to parent range
			if (p < size) {
				//use the aggregator to merge the parent and child
				this.tree[p] = this.reversableAggregator.merge(this.tree[p], this.tree[i]);
			}
		}
	}

	private getParentIndex(i: number) {
		return i + (i & -i);
	}

	private getNextIndex(i: number) {
		return i - (i & -i);
	}

	//query the prefix sum from 1 to i
	query(i: number): T {
		//Complexity:
		//Time: O(log n) - tree traversal is log n		
		let result: T | undefined = undefined;
		while (i > 0) {
			if (!result) {
				//first item is the sum itself, which is the index of 1
				result = this.tree[i];
			} else {
				//use the aggregator to merge the parent/previous and child
				result = this.reversableAggregator.merge(result, this.tree[i]);
			}
			i = this.getNextIndex(i); // zeroes the least significant bit of value 1. e.g. 1100 - 0100 = 1000
		}
		return result!;
	}

	queryRange(i: number, j: number): T {
		//Time: O(log n) - tree traversal is log n		
		if (i > 1) {
			//remove the prefix sum from 1 to i-1, or generic way to performing removal, using the aggregator
			return this.reversableAggregator.exclude(this.query(j), this.query(i - 1));
		} else {
			//index is 1, same like simple index query
			return this.query(j);
		}
	}

	/**
	 * returns the original value at index i
	 * since fenwick tree is aggregating the sum, we need to exclude the previous value
	 * @param i 
	 * @returns 
	 */
	valueAt(i: number): T {
		return this.reversableAggregator.exclude(this.query(i), this.query(i - 1));
	}

	private apply(i: number, k: T): void {
		const size = this.tree.length;
		while (i < size) {
			this.tree[i] = this.reversableAggregator.merge(this.tree[i], k);
			i = this.getParentIndex(i);
		}
	}

	update(i: number, value: T): void {
		//Time: O(log n) - tree traversal is log n for update too
		const orig = this.valueAt(i);
		this.apply(i, this.reversableAggregator.exclude(value, orig));
	}
}

// Example usage
const ar = [0, 5, 2, 9, -3, 5, 20, 10, -7, 2, 3, -4, 0, -2, 15, 5];

const o: ReversableOperator<number> = {
	firstItem: () => 0,
	merge: (a, b) => a + b,
	exclude: (c, b) => c - b,
};

const ft = new FenwickTree(ar, o);

console.log("value at 3 =", ft.valueAt(3));
console.log("sum(1, 3) =", ft.queryRange(1, 3));

ft.update(2, 20);
console.log("sum(1, 3) =", ft.queryRange(1, 3));
