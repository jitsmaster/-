import { FenwickTree, type ReversableOperator } from "./fenwick tree";

const o: ReversableOperator<number> = {
	firstItem: () => 0,
	merge: (a, b) => a + b,
	exclude: (c, b) => c - b,
};

export class NumArray {
	//fenwick tree
	tree: FenwickTree<number>;

	constructor(nums: number[]) {
		this.tree = new FenwickTree(nums, o);
	}

	update(index: number, val: number): void {
		this.tree.update(index + 1, val);
	}

	sumRange(left: number, right: number): number {
		return this.tree.queryRange(left + 1, right + 1);
	}
}