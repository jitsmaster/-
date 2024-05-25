/**
 * Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
 * You must write an algorithm that runs in O(n) time.
 */

function longestConsecutive(nums: number[]): number {
	//COmplexity Analysis
	//Time complexity: O(n + log(n)), where n is the number of elements in the array, we sort the array (logn) and go through it once (n)
	//Space complexity: O(n), where n is the number of elements in the array, we are storing the unique numbers in a set
	//map to store the sequences, key is the next starting number, value is the length of the sequence, one map and one set, size up to n
	const sequences = new Map<number, number>();
	//set to store the unique numbers
	//make sure we are not processing dupes, since dupes could mess up the sequence completely
	const uniqueNums = new Set<number>();

	//sorting the least efficientpart of this way, we will try to resolve the problem with it for next function
	nums.sort((a, b) => a - b);

	let maxL = 0;

	for (let num of nums) {
		if (uniqueNums.has(num))
			continue;

		uniqueNums.add(num)
		//for each starting number, it's doesn't belong to the sequence, add it to the map, as num + 1 key with value of 1.
		//if we found the next way to exist in map, we will add a new entry to map, where the key is this number, and value is the previs entry value  + 1
		//and remove the previous entry
		if (!sequences.has(num)) {
			sequences.set(num + 1, 1);
			console.info(`init key: ${num + 1}; init val: 1`)

			maxL = Math.max(maxL, 1);
		}
		else {
			const newKey = num + 1;
			const newVal = sequences.get(num)! + 1;
			console.info(`new key: ${newKey}; new val: ${newVal}`)
			sequences.delete(num);
			sequences.set(newKey, newVal);
			maxL = Math.max(maxL, newVal);
		}
	}

	return maxL;
};

function longestConsecutiveN(nums: number[]): number {
	//now we try to resolve the problem without sorting the array

	//instead of sorting, we turn the array into a set first
	//since all starting of the sequences don't have a previous number, we can check if the number - 1 exists in the set

	const uniqueNums = new Set<number>(nums);

	let maxL = 0;

	for (let num of uniqueNums.values()) {
		if (!uniqueNums.has(num - 1)) {
			//check if the next number exists in the map, if so, we will add a new entry to the map, 
			//where the key is this number, and value is the previs entry value  + 1
			//increase the maxL if needed
			let curMaxL = 1;
			while (uniqueNums.has(num + 1)) {
				curMaxL++;
				num++;
			}
			maxL = Math.max(maxL, curMaxL);
		}
	}

	return maxL;
}
