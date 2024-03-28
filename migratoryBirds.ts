/*
 * Given an array of bird sightings where every element represents a bird type id,
 * determine the id of the most frequently sighted type. If more than 1 type has been
 * spotted that maximum amount, return the smallest of their ids.
 */
export function migratoryBirds(arr: number[]): number {
	//Analysis:
	//we can use a map to store the count of each bird type
	//then we can sort the map by the value descendingly.
	//if the count is the same, we can sort by the id ascendingly
	//then we can return the first element of the sorted map

	//time complexity is O(n) - loop through numbers and map entries (without sort)
	//space complexity is O(n) - potential largest map size
	//create a map
	const map = new Map<number, number>();


	for (let n of arr) {
		if (!map.has(n)) {
			map.set(n, 0);
		}

		const newCount = map.get(n)! + 1;
		map.set(n, newCount);
	}

	// //sort the count last
	// const sorted = Array.from(map.entries()).sort((a, b) => {
	// 	if (a[1] === b[1]) {
	// 		//if the count is the same, then smaller id trump it
	// 		return a[0] - b[0];
	// 	}

	// 	return b[1] - a[1];
	// });

	// return sorted[0][0];

	//no sorting, just iterate through the map
	//this will save the sort time of logn, and save the space of n on the sorted array
	let maxId = 0;
	let maxCount = 0;
	for (let [id, count] of map.entries()) {
		if (count > maxCount) {
			maxCount = count;
			maxId = id;
		} else if (count === maxCount) {
			maxId = Math.min(maxId, id);
		}
	}

	return maxId;

}
