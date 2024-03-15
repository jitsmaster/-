//The question is to find if a pair in the array sums up to the target
//Of course, using map is the best way to solve this problem
function findTwoSum(numbers: number[], target: number): [number, number] | null {
	//Time complexity: O(n)
	//Space complexity: O(n)
	//map of the numbers and it's index
	const map = new Map<number, number>();

	for (let i = 0; i < numbers.length; i++) {
		const complement = target - numbers[i];
		//if map already has the complement, then we have found the pair
		//otherwise, add the number to the map, with numer as the key, and the index as the value
		if (map.has(complement)) {
			return [map.get(complement)!, i];
		}

		//important: check on complement, but set on number itself
		map.set(numbers[i], i);
	}

	return null;
}
