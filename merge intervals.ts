function mergeIntervals(intervals: number[][]): number[][] {
	//question to ask first, is the array sorted
	//this code handle only sorted array
	//Complexity: O(nlogn) for sorting, O(n) for merging, so O(nlogn) in total
	//Space complexity: O(n) for the merged array

	intervals.sort((a, b) => a[0] - b[0]); // Sort intervals based on start time
	const merged: number[][] = [intervals[0]]; // Initialize merged array with the first interval

	intervals.forEach((currentInterval) => {
		const lastMergedInterval = merged[merged.length - 1];

		if (currentInterval[0] <= lastMergedInterval[1]) {
			// If the current interval overlaps with the last merged interval
			lastMergedInterval[1] = Math.max(lastMergedInterval[1], currentInterval[1]); // Merge the intervals by updating the end time
		} else {
			merged.push(currentInterval); // Add the non-overlapping interval to the merged array
		}
	})

	return merged;
}

function mergeIntervalsNoneSorted(intervals: number[][]): number[][] {
	//we will go through the internal and merge items that overlapps
	//Complexity: O(n^2) for the nested loop, O(n) for merging, so O(n^2) in total
	//Space complexity: O(n) for the merged array

	function overlap(a: number[], b: number[]): boolean {
		return Math.max(a[0], b[0]) <= Math.min(a[1], b[1]);
	}

	let merged: number[][] = [intervals[0]]; // Initialize merged array with the first interval

	for (let i = 1; i < intervals.length; i++) {
		const currentInterval = intervals[i];

		//need to get a list of intervals that can be merged
		let potentialMerges = merged.filter((interval) => overlap(interval, currentInterval));
		console.info(potentialMerges)
		if (potentialMerges.length === 0) {
			merged.push(currentInterval);
			continue;
		}

		//now merge all of them together
		let mergeIntervals = potentialMerges.reduce((acc, interval) => {
			acc[0] = Math.min(acc[0], interval[0]);
			acc[1] = Math.max(acc[1], interval[1]);
			return acc;
		}, currentInterval);

		//remove the old intervals that overlaps and add the new one
		merged = merged.filter((interval) => !overlap(interval, currentInterval));
		merged.push(mergeIntervals);
	}

	return merged;
}
