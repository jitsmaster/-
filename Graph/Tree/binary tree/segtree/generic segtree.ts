interface TreeNode {
	val: number;
}

class GenericSegmentTree<T extends TreeNode> {
	private tree: T[];
	private length: number;

	/**
	 * Construct the tree with the given array and merge function
	 * @param arr - the array to build the tree, for quick agregation lookup
	 * @param merge - this function provide the logic to merge two nodes, can be max, min, sum, average, product, so on and so forth
	 * @param startingMergeValueNode - the initial value to start the merge, for example, for max, it should be Number.MIN_VALUE, 
	 * 	for min, it should be Number.MAX_VALUE, 
	 * 	for sum, it should be 0, 
	 *  for product, it should be 1, so on and so forth
	 */
	constructor(arr: T[], private merge: (a: T, b: T) => T, private startingMergeValueNode: T) {
		this.length = arr.length;
		//seg tree storage is always 2 * n, we store the original items (leaves) at the right half of the array
		this.tree = Array(this.length).fill(0).concat(arr);

		//build the tree, start from the end of the first half
		//calling the merge function to merge the two nodes
		for (let i = this.length - 1; i > 0; i--) {
			this.tree[i] = this.merge(this.tree[2 * i], this.tree[2 * i + 1]);
		}
	}

	/**
	 * Performing update on the tree for a given index
	 * @param index 
	 * @param value 
	 * @returns 
	 */
	public update(index: number, value: number): void {
		//push to second half of the array,
		//that is where the real index is
		index += this.length;
		this.tree[index].val = value;
		let newNode: T;

		while (index > 1) {
			index >>= 1; // shift right is the same as divide by 2, which is the parent node
			newNode = this.merge(this.tree[2 * index], this.tree[2 * index + 1]);

			if (this.tree[index] === newNode)
				break; // no update is needed, if the bottom value didn't change, so top value won't change either. break off early

			this.tree[index] = newNode;
		}
	}

	/**
	 * Looks for the aggregation value in the given range, with the provided merge function logic
	 * Note: Without seg tree, this is O(n), since we need to iterate through every item.
	 * With seg tree, it is O(log n)
	 * @param from 
	 * @param to 
	 * @returns 
	 */
	public query(from: number, to: number): number {
		from += this.length; // go to second half of the array
		to += this.length;
		let mergeVal = this.startingMergeValueNode;

		//this is a little bit like fast/slow pointer to detect loop in graph
		//we will stop looping when 'from' and 'to' meet
		//The max value we return is the top node that covers the range		
		while (from < to) {
			if ((from & 1) === 1) { //use bitwise AND here for faster result than modulo
				// 'from' is odd, so it is the right child of its parent, then interval includes node 'from' but doesn't include its parent
				mergeVal = this.merge(mergeVal, this.tree[from]);
				from++;
			}
			if ((to & 1) === 1) { //use bitwise AND here for faster result than modulo
				// 'to' is odd, so it's the right child of its parent, then might as well use the parent
				to--;
				mergeVal = this.merge(mergeVal, this.tree[to]);
			}

			// shift right is the same as divide by 2 but a little faster, also, the auto-floored, 
			// since js number is not integer
			from >>= 1;
			to >>= 1;
		}

		return mergeVal.val;
	}
}
