export class TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;

	constructor(value: number) {
		this.val = value;
		this.left = null;
		this.right = null;
	}
}

class NodeWithLevel {
	node: TreeNode;
	level: number;

	constructor(node: TreeNode, level: number) {
		this.node = node;
		this.level = level;
	}
}

function breadthFirstSearchWithLevelGrouping(root: TreeNode | null): number[][] {
	const result: number[][] = [];
	if (root === null) {
		return result;
	}

	//BFS is using a queue to search breathen first
	const queue: NodeWithLevel[] = [new NodeWithLevel(root, 0)];

	//loop until queue is empty, which means all nodes are visited
	//the queue is dynamic that entire time
	while (!!queue.length) {
		//remove first node from the queue
		const nodeWithLevel = queue.shift()!;
		const node = nodeWithLevel.node;
		const level = nodeWithLevel.level;
		if (!result[level]) {
			result[level] = [];
		}
		result[level].push(node.val);

		//push next level nodes to the queue, with level incremented
		if (!!node.left) {
			queue.push(new NodeWithLevel(node.left, level + 1));
		}
		if (!!node.right) {
			queue.push(new NodeWithLevel(node.right, level + 1));
		}
	}

	return result; //result is a 2D array, each element is an array of nodes at the same level, no reducing needed
}

function breadthFirstSearchWithLevelGroupingWithoutSpecialClass(root: TreeNode | null): number[][] {
	const result: number[][] = [];
	if (root === null) {
		return result;
	}

	//BFS is using a queue to search breathen first
	const queue: { node: TreeNode; level: number }[] = [{ node: root, level: 0 }];

	//loop until queue is empty, which means all nodes are visited
	//the queue is dynamic that entire time
	while (!!queue.length) {
		//remove first node from the queue
		const nodeWithLevel = queue.shift()!;
		const node = nodeWithLevel.node;
		const level = nodeWithLevel.level;
		if (!result[level]) {
			result[level] = [];
		}
		result[level].push(node.val);

		//push next level nodes to the queue, with level incremented
		if (!!node.left) {
			queue.push({ node: node.left, level: level + 1 });
		}
		if (!!node.right) {
			queue.push({ node: node.right, level: level + 1 });
		}
	}

	return result; //result is a 2D array, each element is an array of nodes at the same level, no reducing needed
}

