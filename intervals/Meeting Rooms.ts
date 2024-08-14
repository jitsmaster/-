/**
 * Given an array of meeting time interval objects consisting of start and end times
 * [[start_1,end_1],[start_2,end_2],...] (start_i < end_i), determine if a person could
 * add all meetings to their schedule without any conflicts.
 *
 * Example 1:
 *
 * Input: intervals = [(0,30),(5,10),(15,20)]
 *
 * Output: false
 * Explanation:
 * (0,30) and (5,10) will conflict
 * (0,30) and (15,20) will conflict
 *
 * Example 2:
 *
 * Input: intervals = [(5,8),(9,15)]
 *
 * Output: true
 *
 * Note:
 * (0,8),(8,10) is not considered a conflict at 8
 *
 * Constraints:
 * 0 <= intervals.length <= 500
 * 0 <= intervals[i].start < intervals[i].end <= 1,000,000
 */

function canAttendMeetings(intervals: [number, number][]): boolean {
	//the easiest solution is to keep track of the end time
	//if any following start time is before end time, then cannot attend all meetings
	//otherwise, yes

	//we will sort the meeting by start time first
	const ivs = [...intervals].sort((a, b) => a[0] - b[0]);

	let lastEnd = ivs[0][1];

	for (let i = 1; i < ivs.length; i++) {
		//if the new start time is before last end time, break;
		const [start, end] = ivs[i];
		if (start < lastEnd) {
			return false;
		}

		lastEnd = end;
	}

	return true;
}