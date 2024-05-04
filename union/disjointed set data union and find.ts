/**
 * In a very large set of friends connections, given two user IDs:
 * 1. Can you check if they are friends?
 * 2. What is the size of the largest group of friends? 
 * 
 * Data structure: Disjointed Set
 * Example:  1  2  3  4  5  6  7  8 9
 *   	    -2  1 -1 -1 -1 -1 -1 -1 -1
 * This means that 1 is parent of 2, and 1's group has 2 members, 1 and 2.
 * Positive numbers indicate the top parent of the group, and the negative number indicates the size of the group.
 */

export interface IObjectWithId {
	/**
	 * The unique identifier of the object, here we assume it's a number starting from 1
	 * The actual objects ids don't have to map with every single number
	 */
	id: number;
}
export class DisjoinedSet<T extends IObjectWithId> {
	unionArray: number[];
	items: T[];

	maxGroupId: number = 0;

	constructor(items: T[]) {
		//the union array is initialized with -1, indicating each item is its own parent
		//this is the initial state of the disjointed set
		this.unionArray = Array(items.length + 1).fill(-1);
		this.items = items;
	}

	find(a: T): number {
		let id = a.id;
		//now let's find the parent of the item
		let parent = id;

		//walk up level by level until we find the top parent
		//all top parents are negative numbers, to indicate the size of the union
		while (this.unionArray[parent] >= 0) {
			parent = this.unionArray[parent];
		}

		//now compress the path, so that the next time we find the parent, it's a direct link
		//to the top parent, this will speed up the find operation. The technique is called path compression.
		while (parent !== id) {
			//assign the parent id to the top parent, and assign the parent id to the next level
			//this will move the parent id to the top parent for this item
			[this.unionArray[id], id] = [parent, this.unionArray[id]];
		}

		return parent;
	}

	union(a: T, b: T) {
		const parentA = this.find(a);
		const parentB = this.find(b);

		if (parentA === parentB) {
			return;
		}

		//this merging step, we will group the smaller group to the larger group
		//the size of the group is indicated by the negative number in the union array
		//
		if (this.unionArray[parentA] < this.unionArray[parentB]) {
			//increase the size of the group, the smaller group is merged to the larger group
			this.unionArray[parentA] += this.unionArray[parentB];
			this.unionArray[parentB] = parentA;

			this.maxGroupId = Math.max(-this.maxGroupId, -this.unionArray[parentA]);
		}
		else {
			this.unionArray[parentB] += this.unionArray[parentA];
			this.unionArray[parentA] = parentB;

			this.maxGroupId = Math.max(-this.maxGroupId, -this.unionArray[parentB]);
		}
	}

	getMaxGroupSize(): number {
		return this.maxGroupId;
	}

	getMaxGroup(): T[] {
		//this is an O(n) operation to get all the items in the largest group
		return this.items.filter((item) => this.unionArray[item.id] === -this.maxGroupId);
	}

	getMinGroupSize(): number {
		//min group is size above -1 and below the max group size
		return Math.min(...this.unionArray
			.filter(size => size > -1 && size < -this.maxGroupId)
			.map(size => -size));
	}
}