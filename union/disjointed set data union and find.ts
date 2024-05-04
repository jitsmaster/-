/**
 * In a very large set of friends connections, given two user IDs:
 * 1. Can you check if they are boss and employee in any level of hierarchy?
 * 2. What is the size of the largest group of employees? 
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

	areTheyRelated(a: T, b: T): boolean {
		return this.find(a) === this.find(b);
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

	union(boss: T, employee: T) {
		const bossA = this.find(boss);
		const bossB = this.find(employee);

		if (bossA === bossB) {
			return;
		}

		//this merging step, we will group the smaller group to the larger group
		//the size of the group is indicated by the negative number in the union array
		//Using less then, because the negative number indicates the size of the group
		if (this.unionArray[bossA] < this.unionArray[bossB]) {
			//increase the size of the group, the smaller group is merged to the larger group
			this.unionArray[bossA] += this.unionArray[bossB];
			this.unionArray[bossB] = bossA;

			this.maxGroupId = Math.max(-this.maxGroupId, -this.unionArray[bossA]);
		}
		else {
			this.unionArray[bossB] += this.unionArray[bossA];
			this.unionArray[bossA] = bossB;

			this.maxGroupId = Math.max(-this.maxGroupId, -this.unionArray[bossB]);
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

//usage example:
// const employees = [
// 	{ id: 1 },
// 	{ id: 2 },
// 	{ id: 3 },
// 	{ id: 4 },
// 	{ id: 5 },
// 	{ id: 6 },
// 	{ id: 7 },
// 	{ id: 8 },
// 	{ id: 9 },
// ];

// const disjointedSet = new DisjoinedSet(employees);

// disjointedSet.union(employees[0], employees[1]);
// disjointedSet.union(employees[1], employees[2]);
// disjointedSet.union(employees[3], employees[4]);
// disjointedSet.union(employees[5], employees[6]);
// disjointedSet.union(employees[6], employees[7]);
// disjointedSet.union(employees[7], employees[8]);

// console.log(disjointedSet.areTheyRelated(employees[0], employees[2])); //true
// console.log(disjointedSet.areTheyRelated(employees[0], employees[3])); //false
