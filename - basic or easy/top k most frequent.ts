/**
 * Given an integer array nums and an integer k, return the k most frequent elements within the array.
 * The test cases are generated such that the answer is always unique.
 * You may return the output in any order.
 * @param nums 
 * @param k 
 * @returns 
 */
function topKFrequent(nums: number[], k: number) {
	//Complexity Analysis:
	//Time complexity: O(n + log(c) + k) - n is length of the array, c is the number of unique elements in the array, we iterate through the array once, 
	//then sort the unique map entries, finally iterate through the top k elements
	//Space complexity: O(c + k) - we store the count of each unique element in the map, then create an array of k elements to store the top k elements

	//use a map to store the count of each number
	//key is the number, value is the count
	//sort the map by count in ascending order
	//then just pop the top k from the map

	const map = new Map<number, number>()
	for (let num of nums) {
		if (map.has(num)) {
			map.set(num, map.get(num)! + 1)
		}
		else
			map.set(num, 1);
	}

	//sort the map by value, ascending to pop from end
	const descArr = Array.from(map.entries());
	descArr.sort((a, b) => a[1] - b[1]);

	const res = [];

	//take top k
	while (res.length < k) {
		const item = descArr.pop()!;
		res.push(item[0])
	}

	return res;
}