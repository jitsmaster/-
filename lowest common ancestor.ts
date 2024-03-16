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
	//Time complexity: O(n) - we are traversing the tree once
	//Space complexity: O(1) - constant space with 2 variables

	//get the smaller and larger value of p and q
	const smallVal: number = Math.min(p.val, q.val);
	const largeVal: number = Math.max(p.val, q.val);

	//start from root
	let node: TreeNode | null = root;
	while (node) {
		//if the node value of between the small and large value, then it is the a lowest common ancestor
		//return the node
		if (node.val >= smallVal && node.val <= largeVal) 
			return node;
		//if the node value is less than the small value and large value, then we start searching
		//from the right side of the tree
		//keep searching until we find the lowest common ancestor
		if (node.val < smallVal && node.val < largeVal) {
			node = node.right;
		} else {
			//if the node value is greater than the small value and large value, then we start searching
			//from the left side of the tree
			//keep searching until we find the lowest common ancestor
			node = node.left;
		}
	}

	return null;
}