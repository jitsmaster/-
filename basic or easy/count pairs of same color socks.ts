function sockMerchant(socks: number[]): number {
	//this is a greedy approach
	//simplest one

	//Complexity Analysis:
	//time complexity is O(n) - loop through the array, once for every sock, once for every group
	//space complexity is O(n) - potential largest groups size

	//group and count
	const groups = socks.reduce((acc, cur) => {
		acc.set(cur, (acc.get(cur) || 0) + 1);
		return acc;
	}, new Map<number, number>());

	let count = 0;
	for (const value of groups.values()) {
		count += Math.floor(value / 2);
	}

	return count;
}