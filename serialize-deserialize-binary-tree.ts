class TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;

	constructor(val: number) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

//Serialize binary tree to a string
//recursively serialize the tree
function serialize(root: TreeNode | null): string {
	//Time complexity: O(n) - we visit every node once
	//Space complexity: O(log n) - the space used by the call stack during the recursion
	if (root === null) {
		//need to set the empty node to "null" to keep the structure of the tree
		//otherwise cannot deserialize the tree
		return "null";
	}

	const leftSerialized = serialize(root.left);
	const rightSerialized = serialize(root.right);

	return `${root.val},${leftSerialized},${rightSerialized}`;
}

//serialize the tree to a string
function deserialize(data: string): TreeNode | null {
	//Time complexity: O(n) - we visit every node once
	//Space complexity: O(log n) - the space used by the call stack during the recursion
	const values = data.split(",");
	let index = 0;

	function buildTree(): TreeNode | null {
		//if the value is "null", then the node is empty
		if (index >= values.length || values[index] === "null") {
			//still need to increment the index,
			//since we need to move to the next position
			index++;
			return null;
		}

		const value = parseInt(values[index]);
		const node = new TreeNode(value);

		index++;
		node.left = buildTree();
		node.right = buildTree();

		return node;
	}

	return buildTree();
}
