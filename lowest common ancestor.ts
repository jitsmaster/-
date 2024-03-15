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

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
	//Time complexity: O(n)
	//Space complexity: O(1)

	//get the smaller and larger value of p and q
	const smallVal: number = Math.min(p.val, q.val);
	const largeVal: number = Math.max(p.val, q.val);

	//start from root
	let node: TreeNode | null = root;
	while (node) {
		if (node.val >= smallVal && node.val <= largeVal) return node;
		if (node.val < smallVal && node.val < largeVal) {
			node = node.right;
		} else {
			node = node.left;
		}
	}

	return null;
}