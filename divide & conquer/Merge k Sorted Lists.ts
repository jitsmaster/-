/**
 * 
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

Example 1:

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
	1->4->5,
	1->3->4,
	2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6

Example 2:

Input: lists = []
Output: []

Example 3:

Input: lists = [[]]
Output: []

Constraints:

k == lists.length
0 <= k <= 104
0 <= lists[i].length <= 500
-104 <= lists[i][j] <= 104
lists[i] is sorted in ascending order.
The sum of lists[i].length will not exceed 104.
 */

class ListNode {
	val: number
	next: ListNode | null
	constructor(val?: number, next?: ListNode | null) {
		this.val = (val === undefined ? 0 : val)
		this.next = (next === undefined ? null : next)
	}
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
	//we will use a divide and conquer approach to merge the linked lists
	//we divide the list into 2 chunks and merge them
	//while keep on dividing and merging until we have only one list left

	//this technique is similar to merge sort
	//we divide the list into 2 chunks and merge them
	//while keep on dividing and merging until we have only one list left

	//NOTE: this recursive function cannot really use stack to turn iterative, 
	//since the children have to be divided merged first, unlike dfs, which can use stack to push the children,
	//iterative approach cannot make it happen.
	if (!lists || !lists.length)
		return null;

	return divideAndMerge(lists, 0, lists.length - 1);

	function divideAndMerge(listsArr: Array<ListNode | null>, start: number, end: number): ListNode | null {
		if (start === end) {
			return listsArr[start];
		}

		const mid = (start + end) >> 1;
		const left = divideAndMerge(listsArr, start, mid);
		const right = divideAndMerge(listsArr, mid + 1, end);

		return merge2SortedLinkedList(left, right);
	}


	/**
	 * This is the foundation of the solution, merging 2 lists
	 * Solution is simple, moving 2 lists in the same time,
	 * append the smaller value to the tail, and move pointer on the list with smaller value.
	 * At the end, append the rest of the list to the tail
	 * @param l1 
	 * @param l2 
	 * @returns 
	 */
	function merge2SortedLinkedList(l1: ListNode | null, l2: ListNode | null): ListNode | null {
		if (!l1) return l2;
		if (!l2) return l1;

		const dummyHead = new ListNode();
		let tail = dummyHead;


		while (l1 && l2) {
			//moving pointer on the list with smaller value
			//as we append the smaller value to the tail
			if (l1.val < l2.val) {
				tail.next = l1;
				l1 = l1.next;
			}
			else {
				tail.next = l2;
				l2 = l2.next;
			}

			//advance the tail pointer itself
			tail = tail.next;
		}

		tail.next = l1 || l2; //what ever has extra nodes, append them to the tail

		const res = dummyHead.next;


		return res;
	}

}
