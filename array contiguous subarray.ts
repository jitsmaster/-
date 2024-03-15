function countSubarrays(arr: number[]): number[] {
    const result: number[] = [];

    // iterate through the input array
    // for each element, we find the left and right bounds
    // we count the number of subarrays that can be formed with the current element as the maximum
    // and we add the count to the result array
    for (let i = 0; i < arr.length; i++) {
        //2 pointers to find the left and right bounds
        let left = i;
        let right = i;

        //find the left bound
        //it is the first element to the left that is less than the current element
        while (left > 0 && arr[left - 1] <= arr[i]) {
            left--;
        }

        //find the right bound
        //it is the first element to the right that is less than the current element
        while (right < arr.length - 1 && arr[right + 1] < arr[i]) {
            right++;
        }

        //the number of subarrays that can be formed with the current element as the maximum
        //is the number of subarrays between the left and right bounds
        //plus one since the right is included
        result.push(right - left + 1);
    }

    return result;
}
