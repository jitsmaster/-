/**
 * Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree
 * and inorder is the inorder traversal of the same tree, construct and return the binary tree.
 * 
 * Example 1:
 * 
 * Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 * Output: [3,9,20,null,null,15,7]
 * 
 * Example 2:
 * 
 * Input: preorder = [-1], inorder = [-1]
 * Output: [-1]
 * 
 * Constraints:
 * 
 * 1 <= preorder.length <= 3000
 * inorder.length == preorder.length
 * -3000 <= preorder[i], inorder[i] <= 3000
 * preorder and inorder consist of unique values.
 * Each value of inorder also appears in preorder.
 * preorder is guaranteed to be the preorder traversal of the tree.
 * inorder is guaranteed to be the inorder traversal of the tree.
 */

import { TreeNode } from "../../../bfs and dfs/Breadth-first-search";

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
	//generate a map of inorder array
	//value as key and index as value
	//this will make lookup much faster
	const map = new Map<number, number>();
	for (let i = 0; i < inorder.length; i++) {
		map.set(inorder[i], i);
	}
	return build(0, 0, inorder.length - 1);

	//instead of sub-dividing the array, we can use pointers
	//avoid more memory usage, and make it faster, by not copying the array divisions
	function build(preStart: number, inStart: number, inEnd: number): TreeNode | null {
		//if the pointers are out of bound, return null
		//that includes the case where inStart > inEnd
		//since inStart will be the root, and inEnd will be the leaf
		if (preStart > preorder.length - 1 || inStart > inEnd) {
			return null;
		}
		const root = new TreeNode(preorder[preStart]);
		//don't use indexOf, it will make the solution O(n^2), use the map instead
		const inIndex = map.get(root.val)!;
		//divide the array into left and right
		//the left for inorder will be from inStart to inIndex - 1
		//the right for inorder will be from inIndex + 1 to inEnd
		//the left for preorder will be from preStart + 1 to preStart + inIndex - inStart
		//the right for preorder will be from preStart + inIndex - inStart + 1 to preStart + inIndex - inStart + inEnd - inIndex
		//The reason why we can use inIndex in preorder array: 
		//preorder array is always in the order of root, left, right
		//so the left will be the next element after the root
		//and the right will be the next element after the left
		//so we can calculate the right start by adding the length of the left
		//which is inIndex - inStart + 1
		//and the end of the right will be the end of the array
		//preStart + inIndex - inStart + 1 + inEnd - inIndex

		//Need to remember this formula, left of preorder starts from preStart + 1, and ends at preStart + inIndex - inStart
		//right starts from preStart + inIndex - inStart + 1, and ends at preStart + inIndex - inStart + inEnd - inIndex
		root.left = build(preStart + 1, inStart, inIndex - 1);
		root.right = build(preStart + inIndex - inStart + 1, inIndex + 1, inEnd);
		return root;
	}
}