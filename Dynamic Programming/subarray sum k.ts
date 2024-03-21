function subarraySum(nums: number[], k: number): number {
    //dynamic programming approach variation
    //we are building a map instead of dp array or matrix
    //the key of the map is the sum of the subarray
    //the value of the map is the frequency of the sum
    //we are using the map to store the frequency of the sum
    //so that we can look up the frequency of the sum - k
    //to find out how many subarrays have the sum of k
    //Time complexity is O(n)
    //Space complexity is O(n)

    let count = 0;
    let sum = 0;
    const map = new Map<number, number>();
    map.set(0, 1);

    for (let num of nums) {
        //increment the sum with the current number
        sum += num;
        //if map already has the complement of the sum, we just add the frequency of the complement to the count
        //since the subarray with the sum of k is found
        if (map.has(sum - k)) {
            count += map.get(sum - k)!;
        }
        //if the sum is already in the map, we just increment the frequency
        //if not, we add the sum to the map with the frequency of 1
        map.set(sum, (map.get(sum) || 0) + 1);

        //above is the summary of the following code
        // let currentFrequency = map.get(sum);
        // if (currentFrequency) {
        //     map.set(sum, currentFrequency + 1);
        // } else {
        //     map.set(sum, 1);
        // }
    }

    return count;
}