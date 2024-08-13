//The question is to find if a pair in the array sums up to the target
//Of course, using map is the best way to solve this problem
function findTwoSum(numbers: number[], target: number): [number, number] | null {
	//Time complexity: O(n) - we iterate through the array once
	//Space complexity: O(n) - worse case, we have no matches, then we store all the numbers in the map, 
	//best case, we have all matches, then we store only 1 number in the map which is O(1)
	//map of the numbers and it's index
	const map = new Map<number, number>();

	for (let i = 0; i < numbers.length; i++) {
		const complement = target - numbers[i];
		//if map already has the complement, then we have found the pair
		//otherwise, add the number to the map, with numer as the key, and the index as the value
		if (map.has(complement)) {
			return [map.get(complement)!, i];
		}

		//IMPORTANT: check on complement, but set on number itself!
		map.set(numbers[i], i);
	}

	return null;
}

function hasTwoSum(numbers: number[], target: number): boolean {
	//Time complexity: O(n) - we iterate through the array once
	//Space complexity: O(n) - worse case, we have no matches, then we store all the numbers in the map,
	//best case, we have all matches, then we store only 1 number in the map which is O(1)
	//map of the numbers and it's index
	const set = new Set<number>();

	for (let num of numbers) {
		const complement = target - num;
		//if map already has the complement, then we have found the pair
		//otherwise, add the number to the map, with numer as the key, and the index as the value
		if (set.has(complement)) {
			return true;
		}

		//IMPORTANT: check on complement, but set on number itself!
		set.add(num);
	}

	return false;
}

//This is the 2 pointers solution, only if the array is sorted
//Benefit of this approach is that it requires constant space, better than using map or set
//we can use this approach, because it's SORTED!
//Note: really important to think of using binary search for any ordered listing
function twoSum2Pointers(numbers: number[], target: number): [number, number] | null {

	//Time complexity: O(n) - we iterate through the array once
	//Space complexity: O(1) - we only store 2 pointers
	let left = 0;
	let right = numbers.length - 1;

	while (left < right) {
		const sum = numbers[left] + numbers[right];
		if (sum === target) {
			return [left, right];
		} else if (sum < target) {
			left++;
		} else {
			right--;
		}
	}

	return null;
}
