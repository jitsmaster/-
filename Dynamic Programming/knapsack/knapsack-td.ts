function knapsack_TopDownWithMemoization(weights: number[], values: number[], capacity: number): number {
	const memo: number[][] = [];

	function knapsackRecurse(index: number, remainingCapacity: number): number {
		if (index >= weights.length || remainingCapacity <= 0) {
			return 0;
		}

		if (memo[index] && memo[index][remainingCapacity]) {
			return memo[index][remainingCapacity];
		}

		let maxValue = 0;

		// If the current item's weight is less than or equal to the remaining capacity, we can include the current item
		if (weights[index] <= remainingCapacity) {
			// Value that includes the  current item, which is this item value plus the value of the remaining capacity minus this item's weigth
			const includeItem = values[index] + knapsackRecurse(index + 1, remainingCapacity - weights[index]);
			// Value that excluds the current item, which is the value of the remaining capacity
			const excludeItem = knapsackRecurse(index + 1, remainingCapacity);
			//store the bigger value, this is how we figure out if it's ok to include current item as the max value
			maxValue = Math.max(includeItem, excludeItem);
		} else {
			maxValue = knapsackRecurse(index + 1, remainingCapacity);
		}

		if (!memo[index]) {
			memo[index] = [];
		}

		//store the max value for the current index and remaining capacity
		memo[index][remainingCapacity] = maxValue;
		return maxValue;
	}

	return knapsackRecurse(0, capacity);
}

