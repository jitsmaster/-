/**
 * Max Segment Tree:
 *      11
 *    6   11 
 *  4   6   11
 * 3 4 6 5 11 9
 */
class MaxSegementTree {
	private tree: number[];
	private length: number;

	constructor(arr: number[]) {
		this.length = arr.length;
		//seg tree storage is always 2 * n, we store the original items (leaves) at the right half of the array
		this.tree = Array(this.length).fill(0).concat(arr);

		//build the tree, start from the end of the first half
		//build it back to the front (root)
		//0 position is always vacant, since it will never be used.
		//using the previous example, the tree will look like this:
		// 0 11 6 11 4 6 11 3 4 6 5 11 9
		for (let i = this.length - 1; i > 0; i--) {
			this.tree[i] = Math.max(this.tree[2 * i], this.tree[2 * i + 1]);
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
		this.tree[index] = value;
		let newValue: number;

		while (index > 1) {
			index >>= 1; // shift right is the same as divide by 2, which is the parent node
			newValue = Math.max(this.tree[2 * index], this.tree[2 * index + 1]);

			if (this.tree[index] === newValue)
				break; // no update is needed, if the bottom value didn't change, so top value won't change either. break off early

			this.tree[index] = newValue;
		}
	}

	/**
	 * Looks for the maximum value in the given range
	 * Note: Without seg tree, this is O(n), since we need to iterate through every item.
	 * With seg tree, it is O(log n)
	 * @param from 
	 * @param to 
	 * @returns 
	 */
	public max(from: number, to: number): number {
		from += this.length; // go to second half of the array
		to += this.length;
		let max = Number.MAX_VALUE;

		//this is a little bit like fast/slow pointer to detect loop in graph
		//we will stop looping when 'from' and 'to' meet
		//The max value we return is the top node that covers the range		
		while (from < to) {
			if ((from & 1) === 1) { //use bitwise AND here to faster result than modulo
				// 'from' is odd, so it is the right child of its parent, then interval includes node 'from' but doesn't include its parent
				max = Math.max(max, this.tree[from]);
				from++;
			}
			if ((to & 1) === 1) { //use bitwise AND here to faster result than modulo
				// 'to' is odd, so it's the right child of its parent, then might as well use the parent
				to--;
				max = Math.max(max, this.tree[to]);
			}
			from >>= 1; // shift right is the same as divide by 2 but a little faster
			to >>= 1;
		}

		return max;
	}
}
