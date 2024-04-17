import { FenwickTree, type ReversableOperator } from "./fenwick tree";

const o: ReversableOperator<number> = {
	defaultValue: () => 0,
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
		//fenwick tree is 1 based index
		//so all indexes have to plus 1
		this.tree.update(index + 1, val);
	}

	sumRange(left: number, right: number): number {
		//fenwick tree is 1 based index
		//so all indexes have to plus 1		
		return this.tree.queryRange(left + 1, right + 1);
	}
}