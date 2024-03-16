function circularArrayRotation(a: number[], k: number, queries: number[]): number[] {
    //Complexity: 
    //Time: O(n)
    //Space: O(n)
    //explanation:
    //for each query, get the index of the element in the rotated array
    //by subtracting the number of rotations from the index of the query
    //and taking the modulus of the length of the array
    return queries.map(query => a[(a.length - k + query) % a.length]);
}

function circularArrayRotationActual(a: number[], k: number, counterClockWise: boolean): number[] {
    //Complexity: 
    //Time: O(n)
    //Space: O(n)
    //explanation:
    //for each query, get the index of the element in the rotated array
    //by subtracting the number of rotations from the index of the query
    //and taking the modulus of the length of the array
    k = k % a.length;
    if (!counterClockWise)
        //if clockwise, the last k elements will be moved to the front
        return a.slice(a.length - k).concat(a.slice(0, a.length - k));
    else
        //if counter clockwise, the first k elements will be moved to the end
        return a.slice(k).concat(a.slice(0, k));
}

function circularArrayRotationInPlace(a: number[], k: number, counterClockWise: boolean): void {
    //Complexity: 
    //Time: O(n) - 3 passes through the array
    //Space: O(1) - constant space
    //explanation:
    //reverse the entire array
    //reverse the first k elements
    //reverse the last n-k elements
    k = k % a.length;

    function reverse(arr: number[], start: number, end: number): void {
        //2 pointers
        while (start < end) {
            [arr[start], arr[end]] = [arr[end], arr[start]];
            start++;
            end--;
        }
    }

    //reverse the entire array first
    reverse(a, 0, a.length - 1);
    if (!counterClockWise) {
        //reverset the frist k element, which were from the end
        reverse(a, 0, k - 1);
        //reverse the last n-k elements, which were from the start
        reverse(a, k, a.length - 1);
    } else {
        //reverset the frist n-k element, which were from the start
        reverse(a, 0, a.length - k - 1);
        //reverse the last k elements, which were from the end
        reverse(a, a.length - k, a.length - 1);
    }
}