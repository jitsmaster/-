/*
 * A person wants to determine the most expensive computer keyboard and USB drive that can be 
purchased with a give budget. Given price lists for keyboards and USB drives and a 
budget, find the cost to buy them. If it is not possible to buy both items, return .
 */
function getMoneySpent(keyboards: number[], drives: number[], budget: number): number {
	//brute force approach
	let maxCost = -1;

	// Iterate over each combination of keyboard and USB drive
	for (let i = 0; i < keyboards.length; i++) {
		for (let j = 0; j < drives.length; j++) {
			// Calculate the cost of buying the current keyboard and USB drive
			let cost = keyboards[i] + drives[j];

			// Check if the cost is within the budget and greater than the current maximum cost
			if (cost <= budget && cost > maxCost) {
				maxCost = cost;
			}
		}
	}

	return maxCost;
}