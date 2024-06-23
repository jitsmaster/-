/**
 * Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.
 *
 * Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.
 *
 * Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.
 *
 * Example 1:
 *
 * Input: root = [1,2,3,null,null,4,5]
 * Output: [1,2,3,null,null,4,5]
 *
 * Example 2:
 *
 * Input: root = []
 * Output: []
 *
 * Constraints:
 *
 * The number of nodes in the tree is in the range [0, 104].
 * -1000 <= Node.val <= 1000
 */

import { TreeNode } from "../../../bfs and dfs/Breadth-first-search";

//Serialize binary tree to a string
//recursively serialize the tree
function serialize(root: TreeNode | null): string {
	//Time complexity: O(n) - we visit every node once
	//Space complexity: O(log n) - the space used by the call stack during the recursion
	if (root === null) {
		//need to set the empty node to "null" to keep the structure of the tree
		//otherwise cannot deserialize the tree
		return "N";
	}

	const leftSerialized = serialize(root.left);
	const rightSerialized = serialize(root.right);

	//The structure of the tree is root, left, right
	//but no by level, since it's dfs, it will look like this
	/*
	 * root
	 *  |
	 * left node | left node left | left node right
	 *  |
	 * right
	 
	*/
	//The children will be included first before next sibling
	//This is perfect for using the same dfs to deserialize the tree too

	return `${root.val},${leftSerialized},${rightSerialized}`;
}

//serialize the tree to a string
function deserialize(data: string): TreeNode | null {
	//Analysis:
	//The idea is to recursively build the tree from the serialized string
	//If the value is "null", then the node is empty
	//Otherwise, we create a new node with the value
	//Then we recursively build the left and right nodes
	//The index is used to keep track of the current position in the string
	//We increment the index after processing each node
	//The buildTree function returns the node at the current position
	//Finally, we return the root node of the tree

	//Time complexity: O(n) - we visit every node once
	//Space complexity: O(h) - the space used by the call stack during the recursion
	const values = data.split(",");
	let pointer = 0;

	function buildTree(): TreeNode | null {
		//if the value is "null", then the node is empty
		if (pointer >= values.length || values[pointer] === "N") {
			//still need to increment the pointer,
			//since we need to move to the next position
			pointer++;
			return null;
		}

		const value = parseInt(values[pointer]);
		const node = new TreeNode(value);

		pointer++;
		node.left = buildTree();
		node.right = buildTree();

		return node;
	}

	return buildTree();
}
