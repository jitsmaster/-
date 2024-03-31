function sherlockAndMinimax(arr: number[], p: number, q: number): number {
	//brute force first
	let maxMion = 0;
	let maxMinLowestINdex = Infinity

	for (let i = p; i <= q; i++) {
		let min = Number.MAX_SAFE_INTEGER;
		for (let num of arr) {
			min = Math.min(min, Math.abs(num - i));
		}

		if (min > maxMion) {
			maxMion = min;
			maxMinLowestINdex = i;
		} else if (min === maxMion) {
			maxMinLowestINdex = Math.min(maxMinLowestINdex, i);
		}
	}

	return maxMinLowestINdex;
}