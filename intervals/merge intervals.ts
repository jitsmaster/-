/**
 * Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals,
 * and return an array of the non-overlapping intervals that cover all the intervals in the input.
 *
 * Example 1:
 *
 * Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
 * Output: [[1,6],[8,10],[15,18]]
 * Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
 *
 * Example 2:
 *
 * Input: intervals = [[1,4],[4,5]]
 * Output: [[1,5]]
 * Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 *
 * Constraints:
 * 1 <= intervals.length <= 104
 * intervals[i].length == 2
 * 0 <= starti <= endi <= 104
 */

function merge(intervals: number[][]): number[][] {
	//Complexity:
	//Time: O(nlogn) - nlogn for sorting, n for iteration, so nlogn
	//Space: O(n) - storing merged result
	//sort first, so we only need to worry about the end time
	intervals.sort((a, b) => a[0] - b[0]);
	const merged: number[][] = []

	for (const i of intervals) {
		const last = !!merged.length ? merged[merged.length - 1] : undefined;
		//first item, or last end if before this start, add to merged directly
		if (!last || last[1] < i[0])
			merged.push(i)
		else {
			//overlap happened, only need to expand the end
			//we are just updating the current item
			last[1] = Math.max(i[1], last[1]);
		}
	}

	return merged
};

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
