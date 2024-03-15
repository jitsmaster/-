function findLongestSubarray(arr: number[], diff: number): number[] {
    //sliding window, only works for sorted arrays. since it's any items diff, we just need to compare start and end
    //Complexity: O(n) - for the while loop
    //Space: O(n) - for the longestSubarray
    arr.sort((a, b) => a - b);
    let start = 0;
    let end = 1;
    let maxLength = 0;
    let longestSubarray: number[] = [];

    while (end < arr.length) {
        if (Math.abs(arr[end] - arr[start]) <= diff) {
            //abs of start and end items is less than or equal to diff
            //update maxLength and longestSubarray
            //move end pointer to the right
            const length = end - start + 1;
            if (length > maxLength) {
                maxLength = length;
                longestSubarray = arr.slice(start, end + 1);
            }
            end++;
        } else {
            //abs of start and end items is greater than diff
            //move start pointer to the right
            //if start pointer is equal to end pointer, move end pointer to the right too
            start++;
            if (start >= end) {
                end = start + 1;
            }
        }
    }

    return longestSubarray;
}

// Example usage
const arr = [1, 2, 3, 4, 5, 6, 7];
const diff = 2;
const longestSubarray = findLongestSubarray(arr, diff);
console.log(longestSubarray); // Output: [1, 2, 3, 4]