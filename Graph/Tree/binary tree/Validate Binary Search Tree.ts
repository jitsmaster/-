import type { TreeNode } from "../../../bfs and dfs/Breadth-first-search";

/**
 * Given the root of a binary tree, determine if it is a valid binary search tree (BST).
 *
 * A valid BST is defined as follows:
 *
 * - The left subtree of a node contains only nodes with keys less than the node's key.
 * - The right subtree of a node contains only nodes with keys greater than the node's key.
 * - Both the left and right subtrees must also be binary search trees.
 *
 * Example 1:
 *
 * Input: root = [2,1,3]
 * Output: true
 *
 * Example 2:
 *
 * Input: root = [5,1,4,null,null,3,6]
 * Output: false
 * Explanation: The root node's value is 5 but its right child's value is 4.
 *
 * Constraints:
 *
 * - The number of nodes in the tree is in the range [1, 104].
 * - -231 <= Node.val <= 231 - 1
 */

function checkIfBinaryTreeIsBinarySearchTree(root: TreeNode | null): boolean {
	//simpler than it looks
	//in order traversal of BST is sorted
	//so we can do an in order traversal and check if the result is sorted

	const res: number[] = [];

	function inOrderTraversal(node: TreeNode | null) {
		if (!node)
			return;
		//in order traversal sequence is left, root, right
		inOrderTraversal(node.left);
		res.push(node.val);
		inOrderTraversal(node.right);
	}

	inOrderTraversal(root);
	let sorted = true;

	//check to make sure the result is sorted
	linearCheckSorted();

	return sorted;

	function linearCheckSorted() {
		for (let i = 0; i < res.length - 1; i++) {
			if (res[i] > res[i + 1]) {
				sorted = false;
				break;
			}
		}
	}

	//This is pretty much the same as linear, same O(n) time complexity
	//but we are using two pointers to check if the array is sorted
	//so it's half the time, since we are checking two items at a time
	function twoPointersCheckSorted(nums: number[]) {
		if (nums.length === 1)
			return true;

		//for odd numbers, the middle will be missing
		//so we take the last item out to compare later
		const oddL = nums.length % 2 !== 0;
		let left = 0;
		let right = oddL ? nums.length - 2 : nums.length - 1;
		while (left < right) {
			if (nums[left] >= nums[right])
				return false;
			else {
				if (left !== 0
					&& right !== nums.length - 1
					&& (nums[left] <= nums[left - 1] || nums[right] >= nums[right + 1])) {
					return false;
				}
			}

			left++;
			right--;
		}

		if (oddL) {
			//just check to make sure the last item is bigger than the item before
			return nums[nums.length - 1] > nums[nums.length - 2];
		}

		return true;
	}
}