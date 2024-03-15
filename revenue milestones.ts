function getMilestoneDays(revenue: number[], milestones: number[]): number[] {
	//this is a loop of binary search
	//since we need to calculate the total revenue for each milestone
	//we need to find the day when the total revenue reaches the milestone
	//we can use binary search to find the day
	//for each milestone, we find the day when the total revenue reaches the milestone
	//and add the day to the result array

	//Complexity Analysis:
	//The calculateTotalRevenue function has a time complexity of O(n), where n is the length of the revenue array.
	//The getMilestoneDays function thus has time complexity of O(m * n * log n), where m is the length of the milestones array and n is the length of the revenue array.
	//Space complexity is O(m), where m is the length of the milestones array, because we need to create a new array to store the result

	const milestoneDays: number[] = [];

	for (let i = 0; i < milestones.length; i++) {
		let currentMilestone = milestones[i];
		let left = 0;
		let right = revenue.length - 1;
		let day = -1;

		while (left <= right) {
			let mid = Math.floor((left + right) / 2);
			let totalRevenue = calculateTotalRevenue(revenue, mid);

			if (totalRevenue >= currentMilestone) {
				day = mid;
				right = mid - 1;
			} else {
				left = mid + 1;
			}
		}

		if (day !== -1) {
			milestoneDays.push(day + 1);
		}
	}

	return milestoneDays;
}

function calculateTotalRevenue(revenue, day) {
	let totalRevenue = 0;

	for (let i = 0; i <= day; i++) {
		totalRevenue += revenue[i];
	}

	return totalRevenue;
}
