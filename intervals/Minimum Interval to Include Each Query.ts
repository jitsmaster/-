/**
 * You are given a 2D integer array intervals, where intervals[i] = [lefti, righti] describes the ith interval
 * starting at lefti and ending at righti (inclusive). The size of an interval is defined as the number of
 * integers it contains, or more formally righti - lefti + 1.
 *
 * You are also given an integer array queries. The answer to the jth query is the size of the smallest interval
 * i such that lefti <= queries[j] <= righti. If no such interval exists, the answer is -1.
 *
 * Return an array containing the answers to the queries.
 *
 * Example 1:
 *
 * Input: intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]
 * Output: [3,3,1,4]
 * Explanation: The queries are processed as follows:
 * - Query = 2: The interval [2,4] is the smallest interval containing 2. The answer is 4 - 2 + 1 = 3.
 * - Query = 3: The interval [2,4] is the smallest interval containing 3. The answer is 4 - 2 + 1 = 3.
 * - Query = 4: The interval [4,4] is the smallest interval containing 4. The answer is 4 - 4 + 1 = 1.
 * - Query = 5: The interval [3,6] is the smallest interval containing 5. The answer is 6 - 3 + 1 = 4.
 *
 * Example 2:
 *
 * Input: intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]
 * Output: [2,-1,4,6]
 * Explanation: The queries are processed as follows:
 * - Query = 2: The interval [2,3] is the smallest interval containing 2. The answer is 3 - 2 + 1 = 2.
 * - Query = 19: None of the intervals contain 19. The answer is -1.
 * - Query = 5: The interval [2,5] is the smallest interval containing 5. The answer is 5 - 2 + 1 = 4.
 * - Query = 22: The interval [20,25] is the smallest interval containing 22. The answer is 25 - 20 + 1 = 6.
 *
 * Constraints:
 *
 * 1 <= intervals.length <= 105
 * 1 <= queries.length <= 105
 * intervals[i].length == 2
 * 1 <= lefti <= righti <= 107
 * 1 <= queries[j] <= 107
 */

import { MinPriorityQueue } from "@datastructures-js/priority-queue";


function minInterval(intervals: number[][], queries: number[]): number[] {
	//analysis:
	//for each query, if there is only one interval, that will be returned
	//for overlaps, we choose the shortest

	//The idea is to make it as fast as possible, we don't want to brute force it
	//instead of looping through all intervals for each query, we will try greedy approach

	//sort both intervals and queries
	//iterate through the queries, for each query,found the included intervals and use a MinHeap to store it
	//and increment the indexer for the intervals loop, so visited intervals will not be revisited again.

	//Complexity:
	//Time: O(nlogn + mlogm + mlogn) = O((n+m)log(n+m)), n is the number of intervals, m is the number of queries
	// explanation: nlogn for sorting intervals, mlogm for sorting queries, mlogn for the loop, m is the number of queries, logn for the heap at the length of intervals
	//Space: O(n+m) for the heap, and O(m) for the result, so O(n+m)

	const origQuery = [...queries]
	queries.sort((a, b) => a - b);
	intervals = intervals.sort((a, b) => a[0] - b[0]);

	let index = 0;
	const result = new Map<number, number>(); //query time as key, duration as value

	//we are using one min heap to store all durations
	//this, [duration, endtime]
	//reason is we are only forwarding the index, not going back
	//so keeping the visited items in the queue is quite important
	const minPq = new MinPriorityQueue<[number, number]>();

	for (let q of queries) {
		//only loop from index to end
		//first to push any intervals started before query to the queue
		//since we are starting from incremented index already
		//this will not be a n * m operation
		while (index < intervals.length
			&& intervals[index][0] <= q) { //pull only the intervals starts before it
			//add it min pq, if ends after query time
			const [l, r] = intervals[index];
			minPq.enqueue([r - l + 1, r]);
			index++;
		}

		//now remove any items ends before the query end
		//start from the front, removing older ones first (ends earlier)
		while (!minPq.isEmpty() && minPq.front()[1] < q) {
			minPq.dequeue();
		}

		//after the loop, decide value
		result.set(q, minPq.isEmpty() ? -1 : minPq.front()[0]); //get the min value in the heap
	}

	return origQuery.map(q => result.get(q)!);
};