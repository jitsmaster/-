/**
 * You are given two non-empty linked lists representing two non-negative integers.
 * The digits are stored in reverse order, and each of their nodes contains a single digit.
 * Add the two numbers and return the sum as a linked list.
 *
 * You may assume the two numbers do not contain any leading zero, except the number 0 itself.
 *
 * Example 1:
 * Input: l1 = [2,4,3], l2 = [5,6,4]
 * Output: [7,0,8]
 * Explanation: 342 + 465 = 807.
 *
 * Example 2:
 * Input: l1 = [0], l2 = [0]
 * Output: [0]
 *
 * Example 3:
 * Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
 * Output: [8,9,9,9,0,0,0,1]
 */
class ListNode {
	val: number
	next: ListNode | null
	constructor(val?: number, next?: ListNode | null) {
		this.val = (val === undefined ? 0 : val)
		this.next = (next === undefined ? null : next)
	}
}


function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
	//Complexity:
	//Time: O(n), we need to traverse the two lists together, just once
	//Space: O(n), we are creating a new list with the result, plus the carry variable, and a sum variable that gets collected right away

	//Analysis:
	//Instead of adding the numbers directly, we can add the numbers digit by digit
	//This way we can avoid big int problem.
	//The trick is just to get the carry of this round sum and add it to the next round sum
	//This round digit will beh sum % 10, in case the sum is greater than 10, and has carry

	//carry is the number that will be added to the next round sum
	//initially it is 0, for adding the first digits
	let carry = 0;

	//same technique use a dummy head for less code
	const head = new ListNode();
	let node = head;

	while (!!l1 || !!l2) {
		//add the carry, from previous round, previous carry is exactly the number from previous plus that needs to go to this digit
		const sum = ((l1?.val || 0) + (l2?.val || 0)) + carry;
		if (l1) l1 = l1.next;
		if (l2) l2 = l2.next;

		//get the carry for the next round
		carry = Math.floor(sum / 10);
		//set the digit for the actual node
		//note that the sum could be greater than 10, so we need to take the remainder
		//e.g. 9 + 9 = 18, so the digit is 8 and the carry is 1
		//carry will be added to the result of next round sum
		node.next = new ListNode(sum % 10);
		node = node.next;
	}

	if (carry > 0) {
		node.next = new ListNode(carry);
	}

	return head.next;
};