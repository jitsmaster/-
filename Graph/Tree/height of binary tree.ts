class TreeNode {
	value: number;
	left: TreeNode | null;
	right: TreeNode | null;

	constructor(value: number) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

function getHeight(root: TreeNode | null): number {
	//this is dfs approach
	//recurse on both side and get the max of the two
	if (root === null) {
		return 0;
	}

	const leftHeight = getHeight(root.left);
	const rightHeight = getHeight(root.right);

	return Math.max(leftHeight, rightHeight) + 1;
}