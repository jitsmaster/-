/**
 * Victoria is splurging on expensive accessories at her favorite stores. Each store stocks  types of accessories,
 * where the  accessory costs  dollars (). Assume that an item's type identifier is the same as its cost, and the
 * store has an unlimited supply of each accessory.
 * 
 * Victoria wants to purchase a total of  accessories according to the following rule:
 * 
 * Any -element subset of the purchased items must contain at least  different types of accessories.
 * 
 * For example, if , , and , then she must choose  accessories such that any subset of  of the  accessories will
 * contain at least  distinct types of items.
 * 
 * Given , , , and  values for  shopping trips, find and print the maximum amount of money that Victoria can spend
 * during each trip; if it's not possible for Victoria to make a purchase during a certain trip, print SAD instead.
 * You must print your answer for each trip on a new line.
 * 
 * @param purchaseCount 
 * @param accessoryCount 
 * @param groupSize 
 * @param distinctTypesPerGroup 
 */
function accessoryCollection(purchaseCount: number, accessoryCount: number, groupSize: number, distinctTypesPerGroup: number): string {
	//Complexity:
	// - Time: O(n) - 1 iteration
	// - Space: O(1) - 6 variables, constant space

	//Analysis:
	//This is a greedy approach solution, any other ways will not cover all scenarios
	//There are 3 scenarios:
	// - If the types required per group are greater than the group size, or the number of groups is greater than the number of accessories collecting, impossible to meet
	// - If each group only has 1 type, then the sum of the first N types is the answer
	// - If none of the above met, we will need to calculate the maximum purchase
	// Inpiration from: https://medium.com/@mayankkharbanda/greedy-algorithms-a-case-study-2932728201ec

	if (distinctTypesPerGroup > groupSize || groupSize > purchaseCount) {
		//If the types required per group are greater than the group size,
		//or the number of groups is greater than the number of accessories collecting,
		//impossible to meet
		return 'SAD';
	} else if (distinctTypesPerGroup === 1) {
		//if each group only needs 1 type, then the sum of the first N types is the answer
		//then the any combo will work, so the sum is A * L, number of accessories times the collection size
		return (accessoryCount * purchaseCount).toString();
	} else {
		let maxPurchase = 0;
		// We will always keep a location empty for the distinctTypesPerGroup-th distinct accessory in the subset groupSize and divide the groupSize-1 locations 
		// equally to the D-1 accessories.

		// Say (groupSize-1)/(distinctTypesPerGroup-1) equals X. 
		// We will extend the subset groupSize and fill every accessory X times till whole of the set purchaseCount is occupied.		

		//To solve the problem, we will divide the purchasing set into three subsets: max, mid and min

		//first we calculate the mid point, which is the maximum number of groups that can be purchased
		//divided by the minimum required types of accessories per group minus 1

		//this number the number of items per type for each group
		const mid = Math.floor((groupSize - 1) / (distinctTypesPerGroup - 1));
		for (let i = mid; i >= 1; i--) {
			//calculate the maximum number of accessories that can be purchased
			//it is the count of accessory with maximum cost
			const max = i + (groupSize - (i * (distinctTypesPerGroup - 1))) - 1;
			//calculate the number of accessories that can be purchased
			//it is the count of all the accessories that would be present in the purchase set, except the accessory at groupSize 
			//and the last possible accessory in the set.
			const terms = Math.floor((purchaseCount - max) / i);
			//calculate the minimum number of accessories that can be purchased
			//which is the remainder of the number of accessories minus the maximum number of accessories,
			//mod by the 
			//it is the count of the last possible accessory in the set
			const end = (purchaseCount - max) % i;

			//Range: 0 <= end <= i <= max <= purchaseCount.

			// We will check for all the possible values for i from (M-1)/(D-1) to 1, assign the values to max and end
			// accordingly and check for the case which gives us maximum cost.

			// If the number of accessories that can be purchased is greater than the total number of accessories minus one, 
			// or end is greater than 0, and the number of accessories that can be purchased is equal to the total number of accessories minus one,
			// break the loop.
			if (terms > accessoryCount - 1 || end > 0 && terms === accessoryCount - 1) {
				break;
			}

			//calculate the sum of the accessories that can be purchased
			//the formula below is quite complex, but it is derived from the sum of the arithmetic progression
			const sum = max * accessoryCount
				+ (end * (accessoryCount - terms - 1))
				+ (((accessoryCount - 1 + accessoryCount - terms) * terms * i) / 2);

			if (sum < maxPurchase)
				break;

			maxPurchase = sum;
		}

		if (maxPurchase === 0) {
			return 'SAD';
		}

		return maxPurchase.toString();
	}
}
