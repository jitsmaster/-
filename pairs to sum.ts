function numberOfWays(arr: number[], k: number) {
	//create a map to store the frequency of each number
	//the point is frequency is stored in the map, not the actual number values
	//this way, we can count the repeated numbers

	//Complexity Analysis:
	//Time complexity: O(n) - we iterate through the array once
	//Space complexity: O(n) - worse case, we have no matches, then we store all the numbers in the map, best case, we have all matches, then we store only 1 number in the map which is O(1)

	const freqMap = new Map<number, number>();
	let count = 0;

	for (const num of arr) {
		const complement = k - num;
		//if the complement exists in the map, add its frequency to the count
		if (freqMap.has(complement)) {
			count += freqMap.get(complement)!;
		}

		//increment the frequency number and add to the map
		freqMap.set(num, (freqMap.get(num) || 0) + 1);
	}

	return count;
}
