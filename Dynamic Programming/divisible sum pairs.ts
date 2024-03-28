function divisibleSumPairs(n: number, k: number, ar: number[]): number {
	//this a DP approach, with only O(n) time complexity
	let count = 0;

	//store the count of remainders in dp table
	const remainderCount = new Array(k).fill(0);

	//go through the array and calculate the count of pairs that are divisible by k
	//for each position, we calculate the remainder of the current element mod by k
	//then we calculate the complement of the remainder, which is the number that when added to the remainder will be divisible by k
	for (let i = 0; i < n; i++) {
		//get the remainder of the current element mod by k
		const remainder = ar[i] % k;
		//get the complement of the remainder, which is the number that when added to the remainder will be divisible by k
		const complement = (k - remainder) % k;
		//what we are storing is the count of pairs for specific complement
		//since the complement is module of k, it will always be less then k
		count += remainderCount[complement];

		//increment the count of the current remainder
		remainderCount[remainder]++;
	}

	return count;
}