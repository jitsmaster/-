/**
 * There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.
 * You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first 
 * if you want to take course ai.
 * For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
 * Return true if you can finish all courses. Otherwise, return false.
 * @param numCourses 
 * @param prerequisites 
 * @returns 
 */
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    // Create a graph
    // The graph is represented as an adjacency list (map)
    // The key is the course and the value is the list of courses that are dependent on the key course
    const graph = new Map<number, number[]>();
    // Create an in-degree map
    // The key is the course and the value is the number of courses that are dependent on the key course
    const inDegree = new Map<number, number>();

    // Initialize the graph and in-degree map
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
        if (value === 0) {
            queue.push(key);
        }
    });

    let count = 0;
    while (queue.length > 0) {
        // dequeue the course
        const course = queue.shift()!;
        count++;

        //since we build the graph already, we can just get the next sources from prereq
        //and decrement their in-degree by 1
        for (const neighbor of graph.get(course)!) {

            /// decrement the in-degree of the neighbor by 1
            inDegree.set(neighbor, inDegree.get(neighbor)! - 1);

            // if the in-degree of the neighbor becomes 0, add it to the queue
            if (inDegree.get(neighbor)! === 0) {
                queue.push(neighbor);
            }

            // repeat the process until the queue is empty
        }
    }

    return count === numCourses;
};