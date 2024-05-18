class LockComboVertex {
	value: string;
	// gScore (movement cost) is the number of moves from the start vertex to this vertex
	gScore: number;
	// hScore (heuristic cost) is the estimated number of moves from this vertex to the target vertex
	hScore: number;
	// fScore (total score) is the sum of gScore and hScore
	fScore: number;

	constructor(value: string, gScore: number, hScore: number) {
		this.value = value;
		this.gScore = gScore;
		this.hScore = hScore;
		this.fScore = gScore + hScore;
	}
}

/**
 * You have a lock in front of you with 4 circular wheels. Each wheel has 10 slots: '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'.
 * The wheels can rotate freely and wrap around: for example we can turn '9' to be '0', or '0' to be '9'.
 * Each move consists of turning one wheel one slot.
 *
 * The lock initially starts at '0000', a string representing the state of the 4 wheels.
 *
 * You are given a list of deadends dead ends, meaning if the lock displays any of these codes,
 * the wheels of the lock will stop turning and you will be unable to open it.
 *
 * Given a target representing the value of the wheels that will unlock the lock,
 * return the minimum total number of turns required to open the lock, or -1 if it is impossible.
 *
 * @param deadends
 * @param target
 * @returns the minimum total number of turns required to open the lock, or -1 if it is impossible
 */
function openLock(deadends: string[], target: string): number {
	//Complexity Analysis:
	//Time Complexity: O(b^d), where b is the branching factor – the average number of edges from each node, and d is the number of nodes on the resulting path, 
	//Space Complexity: O(b^d), where b is the branching factor – the average number of edges from each node, and d is the number of nodes on the resulting path.

	const start = '0000';
	if (deadends.includes(start)) {
		return -1;
	}

	const deadendsSet = new Set(deadends);

	//graph start with the '0000' vertex, which is the root node, just like any other BFS
	const graphQueue: LockComboVertex[] = [new LockComboVertex(start, 0, heuristic(start, target))];
	//closedSet is a set of vertices that have been visited and no longer need to be visited
	const closedSet: Set<string> = new Set();

	//directions to rotate the lock dial, 1 is up, which increases the digit, -1 is down, which decreases the digit
	const directions = [-1, 1];

	//performing BFS with A* algorithm
	while (graphQueue.length > 0) {
		//sort the graphQueue based on the fScore
		//shortest path first, we can also priority queue for this, this is just a simple way to do it
		const current = graphQueue.sort((a, b) => a.fScore - b.fScore)[0];
		graphQueue.splice(graphQueue.indexOf(current), 1);

		if (current.value === target) {
			//if the current vertex is the target vertex, return the path length, we reached the target
			return current.gScore;
		}

		//branching out to the 4 possible vertices from the current vertex
		for (let i = 0; i < 4; i++) {
			//for each direction (up or down), add the new vertex to the graphQueue
			//in graph term, the 2 directions are child nodes of the current node
			//plus the 4 digits, each node will have 8 child nodes
			for (const direction of directions) {
				const newValue = rotate(current.value, i, direction);
				//make sure the node is not yet closed, and not on a blockage
				if (!closedSet.has(newValue) && !deadendsSet.has(newValue)) {
					//no weight on edges, just move one step
					const gScore = current.gScore + 1;
					const hScore = heuristic(newValue, target);
					const newNode = new LockComboVertex(newValue, gScore, hScore);
					graphQueue.push(newNode);
					closedSet.add(newValue);
				}
			}
		}
	}

	return -1;
}

/**
 *  Rotate the lock dial by one digit in the given direction
 * @param value 
 * @param index 
 * @param direction 
 * @returns 
 */
function rotate(value: string, index: number, direction: number): string {
	//create an array of digits from the value
	const digits = value.split('').map(Number);
	// rotate the digit at the given index by the given direction
	digits[index] = (digits[index] + direction + 10) % 10;
	return digits.join('');
}

/**
 * Calculate the heuristic value for the A* algorithm
 * most crucial part of the A* algorithm
 * @param value 
 * @param target 
 * @returns 
 */
function heuristic(value: string, target: string): number {
	let distance = 0;

	//lock has 4 digits, we add up the distance of each digit, from current value to target value
	//this is the heuristic value, which normally is the lower bound of the actual distance
	//following the rule of heuristics, it should never overestimate the actual distance
	for (let i = 0; i < 4; i++) {
		const diff = Math.abs(Number(value[i]) - Number(target[i]));
		distance += Math.min(diff, 10 - diff);
	}
	return distance;
}
