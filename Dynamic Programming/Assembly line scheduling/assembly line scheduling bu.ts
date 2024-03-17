function assembly(manufacturingTimes: number[][], transferTimes: number[][], inputVals: number[], outputVals: number[]): number {
	//dynamic programming
	//Complexity:
	//Time: O(n) - we have to go through all the manufacturing times
	//Space: O(n) - we create 2 dp tables of size n

	const n = manufacturingTimes[0].length;

	//this is a unique case, where we are using 2 dp tables
	//one for each assembly line
	//this is because the time to reach the end of the line is different
	//and we need to keep track of both
	const T1: number[] = new Array(n);
	const T2: number[] = new Array(n);

	// adding base case times
	T1[0] = inputVals[0] + manufacturingTimes[0][0];
	T2[0] = inputVals[1] + manufacturingTimes[1][0];

	// Filling the dp tables T1[] and T2[] using recursive relations
	for (let i = 1; i < n; i++) {
		// key logic: we are finding the minimum time to reach the end of the line
		// for each assembly line
		// we are using the transfer times to move between lines
		// and manufacturing times to move within the line
		// we are taking the minimum of the two previous times
		//equation: previous time + Min of (transfer time + current manufacturing time on the other line, 
		//   current manufacturing time on this line)
		T1[i] = Math.min(T1[i - 1] + manufacturingTimes[0][i],
			T2[i - 1] + transferTimes[1][i] + manufacturingTimes[0][i]);
		T2[i] = Math.min(T2[i - 1] + manufacturingTimes[1][i], 
			T1[i - 1] + transferTimes[0][i] + manufacturingTimes[1][i]);
	}

	// finding final times and returning the minimum value
	//logic: we are adding the output times to the end of the lines each each line
	//and taking the minimum of the two lines
	return Math.min(
		T1[n - 1] + outputVals[0], //line 1 final time plus output time
		T2[n - 1] + outputVals[1]); //line 2 final time plus output time
}
