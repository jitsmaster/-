function canOrganizeContainers(containers: number[][]): boolean {
    // The function starts by declaring two empty arrays: containerSizes and ballCounts. These arrays will be used
    // to store the count of each container and the count of each ball type, respectively.

    // The containerSizes array is populated by using the map method on the containers array. For each container,
    // the reduce method is used to calculate the sum of the balls within that container. The resulting sum is then
    // added to the containerSizes array.

    // The ballCounts array is populated by using the reduce method on the containers array. For each container,
    // the forEach method is used to iterate over the balls within that container. Within the forEach loop, the
    // counts array is updated to keep track of the count of each ball type. If the ball type already exists in the
    // counts array, its count is incremented by the current ball count. If the ball type does not exist, it is added
    // to the counts array with the current ball count.

    // The containerSizes and ballCounts arrays are then sorted in ascending order using the sort method. This is a
    // greedy step that allows for an efficient comparison of the two arrays.

    // Finally, the function uses the every method to compare the elements of the containerSizes and ballCounts arrays.
    // If all elements are equal, the function returns true, indicating that the containers can be organized. If any
    // elements are not equal, the function returns false, indicating that the containers cannot be organized.
    
    //Time Complexity: O(n^2) - containers are iterated twice for both arrays to be built
    //Space Complexity: O(n) -new variables sizes are linear

    //we are first going to calculate the count of each container
    const containerSizes = containers.map(
        container => container
            .reduce((acc, balls) => acc + balls, 0)); // sum of each container

    //then we are going to calculate the count of each ball type
    const ballCounts = containers
        .reduce((counts, container) => {
            container
                .forEach((acc, index) => {
                    counts[index] = (counts[index] || 0) + acc;
                });
            return counts;
        }, []); // count of each ball type

    //we will sort both arrays ascendingly, greedy part
    containerSizes.sort((a, b) => a - b);
    ballCounts.sort((a, b) => a - b);

    // compare the arrays, if they are equal, then we can organize the containers
    // that means we can move the balls around to make the containers have the same number of balls
    return containerSizes
        .every((size, index) => size === ballCounts[index]);
}