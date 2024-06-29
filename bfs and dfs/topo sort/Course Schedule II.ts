/**
 * There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.
 * You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
 * 
 * For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
 * Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them.
 * If it is impossible to finish all courses, return an empty array.
 * 
 * Example 1:
 * 
 * Input: numCourses = 2, prerequisites = [[1,0]]
 * Output: [0,1]
 * Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0.
 * So the correct course order is [0,1].
 * 
 * Example 2:
 * 
 * Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
 * Output: [0,2,1,3]
 * Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2.
 * Both courses 1 and 2 should be taken after you finished course 0.
 * So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].
 * 
 * Example 3:
 * 
 * Input: numCourses = 1, prerequisites = []
 * Output: [0]
 * 
 * Constraints:
 * 
 * 1 <= numCourses <= 2000
 * 0 <= prerequisites.length <= numCourses * (numCourses - 1)
 * prerequisites[i].length == 2
 * 0 <= ai, bi < numCourses
 * ai != bi
 * All the pairs [ai, bi] are distinct.
 */

function findOrder(numCourses: number, prerequisites: number[][]): number[] {
	// Algorithm:
	// 1. Create a map, by prereq, each prereq will have a list of courses that depend on it
	// 3. Create a in-degree map, each course will have the count of courses this course depends on
	//    in-degree is the number of edges that are coming into a node
	// 4. Once all items are added to the maps, find the courses from indegree map that have 0 in-degree (no prerequisites)
	// 5. Add these courses to the queue
	// 6. When going over children of the course, decrement the in-degree of each child by 1, because this path is traversed
	// 7. If the in-degree of the child becomes 0, add it to the queue, that means we can take this course now, since all its prerequisites are done
	// 8. Repeat the process until the queue is empty
	// 9. Very much like Course Schedule, except we take the coursed in right order, instead of checking the count

	//Complexity:
	//Time: O(V + E) - we are iterating through the vertices and edges
	//Space: O(V + E) - the size of the graph and in-degree map

	// Create a graph
	// The graph is represented as an adjacency list (map)
	// The key is the course and the value is the list of courses that are dependent on the key course	
	const graph = new Map<number, number[]>();

	// Create an in-degree map
	// The key is the course and the value is the number of courses that are dependent on the key course
	// Note: in-degree is the number of edges that are coming into a node
	const inDegree = new Map<number, number>();

	// Initialize the graph and in-degree map for each entry corresponding to the number of courses
	for (let i = 0; i < numCourses; i++) {
		graph.set(i, []);
		inDegree.set(i, 0);
	}

	// Build the graph and in-degree map based on the prerequisites
	for (let [course, prereq] of prerequisites) {
		graph.get(prereq)!.push(course); // Add the edge, we know that the pre is the parent and course is the child
		inDegree.set(course, inDegree.get(course)! + 1); // Increment the in-degree of the course
	}

	// Add the courses with 0 in-degree to the queue, these are the courses that can be taken first
	// also called "source" nodes. We will start with these nodes and then keep adding the nodes with 0 in-degree
	const queue: number[] = [];
	inDegree.forEach((value, key) => {
		//only add courses with no prerequisites
		if (value === 0) {
			queue.push(key);
		}
	});

	//use bfs, since we can start with multiple nodes in queue
	//have queue inited, and repeat to add more items to the queue
	//and dequeue the items next round
	//until the queue is empty
	let courses = [];
	while (queue.length > 0) {
		// dequeue the course
		const course = queue.shift()!;
		courses.push(course)

		//since we build the graph already, we can just get the next sources from prereq
		//and decrement their in-degree by 1
		for (const neighbor of graph.get(course)!) {

			//decrement the in-degree of the neighbor by 1
			//for each neighbor
			inDegree.set(neighbor, inDegree.get(neighbor)! - 1);

			// if the in-degree of the neighbor becomes 0, add it to the queue
			// reason: we can take this course now since all its prerequisites are done
			// Note: this also helps bypassing the circular dependencies, with circular dependencies, the in-degree will never be 0
			// since the course will always have a dependency
			if (inDegree.get(neighbor)! === 0) {
				queue.push(neighbor);
			}

			// repeat the process until the queue is empty
		}
	}

	return courses.length === numCourses ? courses : []
};