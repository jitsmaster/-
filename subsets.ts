function subsets(nums: number[]): number[][] {
	const result: number[][] = [[]]
	nums.forEach(num => {
		result.forEach(item => {
			//for each item, clone the item and append the number to it to generate a new set
			const newItem = [...item];
			newItem.push(num);
			result.push(newItem)
		})

	})

	return result;
};