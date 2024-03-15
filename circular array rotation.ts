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