function findSignatureCounts(arr) {
    //first we create a new array with the same length as the input array and fill it with 1
    //this is because each student will have at least one signature
    const result = new Array(arr.length).fill(1);

    //then we iterate through the input array
    //for each student, we follow the chain of signatures until we reach the original student
    //we count the number of students in the chain
    //and we update the result array with the number of students in the chain
    for (let i = 0; i < arr.length; i++) {
        let j = arr[i] - 1;
        while (j !== i) {
            result[i]++;
            j = arr[j] - 1;
        }
    }
    return result;
}
