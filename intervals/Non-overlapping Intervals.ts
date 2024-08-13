/**
 * Given an array of intervals intervals where intervals[i] = [starti, endi],
 * return the minimum number of intervals you need to remove to make the rest
 * of the intervals non-overlapping.
 *
 * Example 1:
 *
 * Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
 * Output: 1
 * Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
 *
 * Example 2:
 *
 * Input: intervals = [[1,2],[1,2],[1,2]]
 * Output: 2
 * Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.
 *
 * Example 3:
 *
 * Input: intervals = [[1,2],[2,3]]
 * Output: 0
 * Explanation: You don't need to remove any of the intervals since they're already non-overlapping.
 *
 * Constraints:
 *
 * 1 <= intervals.length <= 105
 * intervals[i].length == 2
 * -5 * 104 <= starti < endi <= 5 * 104
 */

function eraseOverlapIntervals(intervals: number[][]): number {
	//Analysis;
	//The rule is to remove the interval that ends later to prevent overlapping with future intervals
	//so we only need to worry about the end

	//Complexity:
	//Time: O(nlogn) - for sorting, and O(n) for iteration, so O(nlogn)
	//Space: O(1) - 2 variables to store the last end and the count of removed intervals

	//sort first, so we only have to deal with the end
	intervals.sort((a, b) => a[0] = b[0]);

	let lastEnd = intervals[0][1];
	let removeCount = 0;

	for (let i = 1; i < intervals.length; i++) {
		const [start, end] = intervals[i];
		//if the last end is less or equal to start of this interval
		//no overlap, just need to update the last end to this end
		if (lastEnd <= start) {
			lastEnd = end;
		}
		else {
			//has overlap, we will move 1 of them
			removeCount++;

			//we want to remove the interval that ends later, to avoid future overlapping as much as possible
			lastEnd = Math.min(end, lastEnd);
		}
	}

	return removeCount;
};