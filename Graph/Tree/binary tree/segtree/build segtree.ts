const MAX_NUM = 111111; // sufficient size

/* 
*  STRUCTURE OF SEGMENT TREE NODE
*/

class SegTreeNode {
	constructor(
		public maxVal = 0,// maximum value 
		public maxIndex = -1 // extra information is maintained ( not required for this question )
	) { }
}

class SegTree {
	private _storageArray: SegTreeNode[];
	private _initialClone: number[];
	public length: number;

	constructor(arr: number[]) {
		this.length = arr.length;
		this._initialClone = arr.slice();

		//initializing the storage array
		// 4 * MAX_NUM is sufficient size for the segment tree
		// this is the maximum size of the segment tree that can be formed from the given array
		this._storageArray = new Array(4 * 111111).fill(new SegTreeNode());
	}

	/*
	*
	*  MERGING TWO NODES b & c TO FORM A SINGLE NODE a
	*
	*/
	private _merge(a: SegTreeNode, b: SegTreeNode, c: SegTreeNode): void {
		if (b.maxVal < c.maxVal) {
			a.maxVal = c.maxVal;
			a.maxIndex = c.maxIndex;
		} else {
			a.maxVal = b.maxVal;
			a.maxIndex = b.maxIndex;
		}
	}

	/**
	 * Function to build up the a segment of the tree with the given array
	 * @param index 
	 * @param segmentStart 
	 * @param segmentEnd 
	 * @returns 
	 */
	public build(index: number, segmentStart: number, segmentEnd: number): void {
		if (segmentStart === segmentEnd) {   // base case ( only single node )
			this._storageArray[index].maxVal = this._initialClone[segmentStart]; // putting available information 
			this._storageArray[index].maxIndex = segmentStart; // putting available information 
			return;
		}

		//like the name suggests, segment tree is a binary tree,
		//the look of it is 
		/*
		*        1
		*      /   \
		* 	  2     3
		* 	 / \   / \
		* 	4   5 6   7
		* 
		* so the left child of node i is 2*i and right child is 2*i+1 for each layer
		*/
		const mid = Math.floor((segmentStart + segmentEnd) / 2);

		this.build(2 * index, segmentStart, mid); // build left subtree 
		this.build(2 * index + 1, mid + 1, segmentEnd); // build right subtree
		this._merge(this._storageArray[index], this._storageArray[2 * index], this._storageArray[2 * index + 1]);
		// combine result of left subtree and right subtree into current node 
	}

	/*
	*
	*   UPDATING NEW INFORMATION IN THE SEGMENT TREE
	*
	*/
	public update(index: number, segmentStart: number, segmentEnd: number, position: number, value: number): void {
		if (segmentStart === segmentEnd) {
			this._storageArray[index].maxVal = value; // point where the actual updation is required
			return;
		}
		const mid = Math.floor((segmentStart + segmentEnd) / 2);
		if (position <= mid)
			this.update(2 * index, segmentStart, mid, position, value);
		else
			this.update(2 * index + 1, mid + 1, segmentEnd, position, value);
		this._merge(this._storageArray[index], this._storageArray[2 * index], this._storageArray[2 * index + 1]); // propagating upwards the updated information 
	}

	/*
	*
	* QUERING INTERVAL [L,R] FOR THE REQUIRED INFORMATION 
	*
	*/
	/**
	 * Queries the segment tree for a given range and returns the corresponding SegTreeNode.
	 * 
	 * @param index - The index of the current node in the segment tree.
	 * @param segmentStart - The starting index of the current segment.
	 * @param segmentEnd - The ending index of the current segment.
	 * @param rangeLeft - The starting index of the query range.
	 * @param rangeRight - The ending index of the query range.
	 * @returns The SegTreeNode containing the information for the given range.
	 */
	public query(index: number, segmentStart: number, segmentEnd: number, rangeLeft: number, reangeRight: number): SegTreeNode {
		const ret = new SegTreeNode();
		if (rangeLeft > segmentEnd || reangeRight < segmentStart) // out of range 
			return ret;
		if (rangeLeft <= segmentStart && segmentEnd <= reangeRight) // current segment lies completely in the required interval i.e [L,R]
			return this._storageArray[index];
		const mid = Math.floor((segmentStart + segmentEnd) / 2);
		const left = this.query(2 * index, segmentStart, mid, rangeLeft, reangeRight);
		//extracting information from the left if left segment contains part of our interval
		const right = this.query(2 * index + 1, mid + 1, segmentEnd, rangeLeft, reangeRight);
		//extracting information from the right if right segment contains part of our interval
		this._merge(ret, left, right); // combining left and right information
		return ret;
	}
}
