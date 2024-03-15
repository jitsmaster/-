function distributeCandies(ratings: number[]): number {

	// Create a candies array to store the number of candies each child gets
	// Initialize the candies array with 1 candy for each child
	const n = ratings.length;
	const candies = new Array(n).fill(1);

	// Traverse the ratings array from left to right
	for (let i = 1; i < n; i++) {
		if (ratings[i] > ratings[i - 1]) {
			candies[i] = candies[i - 1] + 1;
			// If the current rating is more than previous rating, give one more candy than the previous child
		}
	}

	// Traverse the ratings array from right to left
	for (let i = n - 2; i >= 0; i--) {
		if (ratings[i] > ratings[i + 1]) {
			candies[i] = Math.max(candies[i], candies[i + 1] + 1);
			// If the current rating is more than the next rating, give one more candy than the next child 
		}
	}

	// Calculate the total number of candies needed
	let totalCandies = 0;
	totalCandies = candies.reduce((acc, curr) => acc + curr, 0);

	return totalCandies;
}

