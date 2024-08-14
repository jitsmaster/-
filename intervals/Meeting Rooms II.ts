/**
 * Given an array of meeting time interval objects consisting of start and end times
 * [[start_1,end_1],[start_2,end_2],...] (start_i < end_i), find the minimum number of days
 * required to schedule all meetings without any conflicts.
 *
 * Example 1:
 *
 * Input: intervals = [(0,40),(5,10),(15,20)]
 *
 * Output: 2
 * Explanation:
 * day1: (0,40)
 * day2: (5,10),(15,20)
 *
 * Example 2:
 *
 * Input: intervals = [(4,9)]
 *
 * Output: 1
 * Note:
 * (0,8),(8,10) is not considered a conflict at 8
 *
 * Constraints:
 * 0 <= intervals.length <= 500
 * 0 <= intervals[i].start < intervals[i].end <= 1,000,000
 */
function minMeetingRooms(intervals: number[][]): number {
	//analysis:
	//we can divide the listing into a series of time points, 
	//start points will add 1 room, end point to remove 1 room
	//we will sort the flatmap array by time and plus the 2nd value  to the total count

	//Complexity:
	//Time: O(nlogn) for sorting, O(n) for flatmap, O(n) for iterating through the time points, overall O(nlogn)
	//Space: O(n) for the time points arra, which is n * 2 size

	let count = 0;
	let max = 0;

	//flat map first
	const timepoints = intervals
		.flatMap(([start, end]) => {
			return [[start, 1], [end, -1]];
		});

	//sort the time points
	//sort on the time first, if time are the same, then sort on the order of end first
	//this way we can decrease the count first before increase count for start of next meeting
	//since the problem could be that at very end, we could have 1 end didn't get processed first, 
	//if the last item being the end, then the count will remain at the start of this meeting, so get 1 extra room then needed
	timepoints.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

	//iterate through and perform plus
	for (let t of timepoints) {
		count += t[1];
		max = Math.max(count, max);
	}

	return max;
}