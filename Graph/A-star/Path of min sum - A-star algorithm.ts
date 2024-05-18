class Node {
	f: number;

	constructor(public x: number, public y: number,
		public g: number, public h: number) {
		this.f = g + h;
	}
}

function minPathSum(grid: number[][]): number {
	const m = grid.length;
	const n = grid[0].length;

	const openList: Node[] = [];
	const closedList: Set<number> = new Set();

	const startNode = new Node(0, 0, grid[0][0], heuristic(0, 0, m - 1, n - 1));
	openList.push(startNode);

	while (openList.length > 0) {
		let currentNode = openList[0];
		let currentIndex = 0;

		//compare the f score among the nodes in the same level
		//use the node with the lowest f score as the next node
		//could also use a min priority queue for this
		for (let i = 1; i < openList.length; i++) {
			if (openList[i].f < currentNode.f) {
				currentNode = openList[i];
				currentIndex = i;
			}
		}

		openList.splice(currentIndex, 1);
		closedList.add(getCoords(currentNode));

		if (currentNode.x === m - 1 && currentNode.y === n - 1) {
			//reached the end
			return currentNode.g;
		}

		const neighbors = getNeighbors(currentNode.x, currentNode.y, m, n);

		for (const neighbor of neighbors) {
			const [x, y] = neighbor;
			const gScore = currentNode.g + grid[x][y];
			const hScore = heuristic(x, y, m - 1, n - 1);
			const fScore = gScore + hScore;

			const newNode = new Node(x, y, gScore, hScore);

			if (closedList.has(getCoords(newNode))) {
				continue;
			}

			const existingNode = openList.find((node) => node.x === x && node.y === y);
			if (!existingNode) {
				openList.push(newNode);
			} else {
				//update existing node if the new path is shorter
				if (existingNode && fScore < existingNode.f) {
					existingNode.g = gScore;
					existingNode.f = fScore;
				}
			}
		}
	}

	return -1;

	function getCoords(currentNode: Node): number {
		return currentNode.y * grid.length + currentNode.x;
	}
}

function getNeighbors(x: number, y: number, m: number, n: number): [number, number][] {
	//generic scenario, check all directions, since this problem only allows right and down, we can simplify the code
	// return [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]
	const neighbors: [number, number][] = [];
	if (x < m - 1) {
		neighbors.push([x + 1, y]);
	}
	if (y < n - 1) {
		neighbors.push([x, y + 1]);
	}
	return neighbors; -
}

function heuristic(x1: number, y1: number, x2: number, y2: number): number {
	//Since the distant is Manhattan distance, we can use the formula below
	//for heuristic calculation
	//which is the sum of the absolute differences of the x and y coordinates
	return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}